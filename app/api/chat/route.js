import { NextResponse } from 'next/server'
import { createEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Keywords that trigger emergency 911 warning
const EMERGENCY_KEYWORDS = [
  'heart attack', 'cardiac arrest', 'not breathing', 'no pulse',
  'chest pain', 'stroke', 'unconscious', 'unresponsive', 'anaphylaxis',
  'severe bleeding', 'choking', 'drowning', 'overdose', 'poisoning',
  'seizure', 'stopped breathing', 'no heartbeat', 'collapsed'
]

function checkEmergency(text) {
  const lower = text.toLowerCase()
  return EMERGENCY_KEYWORDS.some(keyword => lower.includes(keyword))
}

export async function POST(request) {
  try {
    const { message } = await request.json()

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const isEmergency = checkEmergency(message)

    // Step 1: Convert user question to embedding
    const queryEmbedding = await createEmbedding(message)

    // Step 2: Search Pinecone for relevant first aid entries
    const index = await getPineconeIndex()
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true
    })

    // Step 3: Extract the relevant content from search results
    const relevantDocs = searchResults.matches
      .filter(match => match.score > 0.2)
      .map(match => ({
        topic: match.metadata.topic,
        content: match.metadata.content,
        source: match.metadata.source,
        sourceUrl: match.metadata.sourceUrl,
        score: match.score
      }))

    // Step 4: Build context from retrieved documents
    let context = ''
    if (relevantDocs.length > 0) {
      context = relevantDocs.map((doc, i) =>
        `[Source ${i + 1}: ${doc.source}]\nTopic: ${doc.topic}\n${doc.content}`
      ).join('\n\n---\n\n')
    }

    // Step 5: Build the prompt for Groq
    const systemPrompt = `You are a first aid assistant that provides accurate, helpful first aid guidance.

IMPORTANT RULES:
- Only use the provided medical sources to answer questions
- Always mention the source of your information
- If the question is not related to first aid or medical emergencies, politely redirect
- Always recommend seeking professional medical help for serious conditions
- Be clear, concise, and use numbered steps when giving instructions
- If no relevant information is found in the sources, say so clearly

${isEmergency ? '🚨 EMERGENCY DETECTED: Start your response with "CALL 911 IMMEDIATELY" in bold.' : ''}

MEDICAL DISCLAIMER: Always end with a brief reminder that this is first aid guidance only and professional medical help should be sought for serious conditions.`

    const userPrompt = relevantDocs.length > 0
      ? `Question: ${message}\n\nRelevant medical information from verified sources:\n\n${context}\n\nPlease provide clear first aid guidance based on the above sources.`
      : `Question: ${message}\n\nNo specific information was found in our first aid database for this query. Please provide general guidance and recommend consulting a medical professional.`

    // Step 6: Send to Groq and get response
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1024
    })

    const answer = completion.choices[0].message.content

    // Step 7: Return answer + sources + emergency flag
    return NextResponse.json({
      answer,
      sources: relevantDocs.map(doc => ({
        topic: doc.topic,
        source: doc.source,
        sourceUrl: doc.sourceUrl,
        relevanceScore: Math.round(doc.score * 100)
      })),
      isEmergency,
      model: 'llama-3.3-70b-versatile'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}