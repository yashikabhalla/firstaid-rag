import { NextResponse } from 'next/server'
import { getRegion, applyRegion } from '@/lib/region'
import { createEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import { isCrisisQuery, getCrisisResponse } from '@/lib/safety'
import { isEmergencyQuery } from '@/lib/emergency'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const MIN_CONFIDENCE = 0.55
const SOURCE_SCORE_MARGIN = 0.15



export async function POST(request) {
  try {
    const { message, region: regionCode = 'IN' } = await request.json()
    const region = getRegion(regionCode)  
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }


    if (isCrisisQuery(message)) {
       return NextResponse.json(getCrisisResponse(regionCode))
    }

    const isEmergency = isEmergencyQuery(message)

    const queryEmbedding = await createEmbedding(message)
    const index = await getPineconeIndex()
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true
    })

    const topScore = searchResults.matches[0]?.score ?? 0
    if (topScore < MIN_CONFIDENCE) {
      return NextResponse.json({
        answer:
          "I don't have verified guidance specific to this in my database. " +
          `Please consult a medical professional, or call ${region.emergency} if this is urgent.`,
        sources: [],
        isEmergency,
        emergencyNumber: region.emergency,
        lowConfidence: true,
        model: 'openai/gpt-oss-120b'
      })
    }

    const relevantDocs = searchResults.matches
  .filter(match => {
    const score = match.score ?? 0

    return (
      score >= MIN_CONFIDENCE &&
      score >= topScore - SOURCE_SCORE_MARGIN
    )
  })
  .map(match => ({
    topic: match.metadata.topic,
    content: applyRegion(match.metadata.content, region),
    source: match.metadata.source,
    sourceUrl: match.metadata.sourceUrl,
    score: match.score
  }))

    const context = relevantDocs.map((doc, i) =>
      `[Source ${i + 1}: ${doc.source}]\nTopic: ${doc.topic}\n${doc.content}`
    ).join('\n\n---\n\n')

    const systemPrompt = `You are a first aid assistant that provides accurate, helpful first aid guidance.

IMPORTANT RULES:
- Only use the verified medical information retrieved by the system to answer questions
- Never say or imply that the user provided, uploaded, or supplied the medical sources
- If the available information does not directly answer the user's question, clearly say that specific guidance was not found in the verified sources
- Always mention the source of your information
- If the question is not related to first aid or medical emergencies, politely redirect
- Always recommend seeking professional medical help for serious conditions
- Be clear, concise, and use numbered steps when giving instructions
- The user's emergency number is ${region.emergency}. Never mention any other country's emergency number.

${isEmergency ? `🚨 EMERGENCY DETECTED: Start your response with "**CALL ${region.emergency} IMMEDIATELY**".` : ''}

MEDICAL DISCLAIMER: Always end with a brief reminder that this is first aid guidance only and professional medical help should be sought for serious conditions.`
    // CHANGED (2): the emergency-number rule line, and the emergency line now uses ${region.emergency}

    const userPrompt = `Question: ${message}\n\nRelevant medical information from verified sources:\n\n${context}\n\nPlease provide clear first aid guidance based on the above sources.`

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1024
    })

    const answer = completion.choices[0].message.content
      .replaceAll('the verified sources you provided', 'the verified sources available to me')
      .replaceAll('the sources you provided', 'the sources available to me')
      .replaceAll('sources you provided', 'sources available to me')

    return NextResponse.json({
      answer,
      sources: relevantDocs.map(doc => ({
      topic: doc.topic,
      source: doc.source,
      sourceUrl: doc.sourceUrl
      })),
      isEmergency,
      emergencyNumber: region.emergency, // CHANGED (3): so the banner shows the right number
      model: 'openai/gpt-oss-120b'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}