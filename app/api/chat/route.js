import { NextResponse } from 'next/server'
import { createEmbedding } from '@/lib/embeddings'
import { getPineconeIndex } from '@/lib/pinecone'
import { isCrisisQuery, CRISIS_RESPONSE } from '@/lib/safety'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Minimum semantic similarity to trust a retrieved document.
// 0.2 was effectively not filtering anything — raised after manual testing.
const MIN_CONFIDENCE = 0.55

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
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // ── Step 0: Crisis check — runs BEFORE embedding/retrieval/generation ──
    if (isCrisisQuery(message)) {
      return NextResponse.json(CRISIS_RESPONSE)
    }

    const isEmergency = checkEmergency(message)

    const queryEmbedding = await createEmbedding(message)

    const index = await getPineconeIndex()
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true
    })

    // ── Confidence filtering ──
    const relevantDocs = searchResults.matches
      .filter(match => match.score >= MIN_CONFIDENCE)
      .map(match => ({
        topic: match.metadata.topic,
        content: match.metadata.content,
        source: match.metadata.source,
        sourceUrl: match.metadata.sourceUrl,
        score: match.score
      }))

    // ── No reliable match: return a fixed response, skip the LLM entirely ──
    if (relevantDocs.length === 0) {
      return NextResponse.json({
        answer:
          "I don't have verified guidance specific to this in my database. " +
          "Please consult a medical professional, or call your local emergency number if this is urgent.",
        sources: [],
        isEmergency,
        lowConfidence: true,
        model: 'openai/gpt-oss-120b'
      })
    }

    const context = relevantDocs.map((doc, i) =>
      `[Source ${i + 1}: ${doc.source}]\nTopic: ${doc.topic}\n${doc.content}`
    ).join('\n\n---\n\n')

    const systemPrompt = `You are a first aid assistant that provides accurate, helpful first aid guidance.

IMPORTANT RULES:
- Only use the provided medical sources to answer questions
- Always mention the source of your information
- If the question is not related to first aid or medical emergencies, politely redirect
- Always recommend seeking professional medical help for serious conditions
- Be clear, concise, and use numbered steps when giving instructions

${isEmergency ? '🚨 EMERGENCY DETECTED: Start your response with "CALL 911 IMMEDIATELY" in bold.' : ''}

MEDICAL DISCLAIMER: Always end with a brief reminder that this is first aid guidance only and professional medical help should be sought for serious conditions.`

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

    return NextResponse.json({
      answer,
      sources: relevantDocs.map(doc => ({
        topic: doc.topic,
        source: doc.source,
        sourceUrl: doc.sourceUrl,
        relevanceScore: Math.round(doc.score * 100)
      })),
      isEmergency,
      model: 'openai/gpt-oss-120b'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}