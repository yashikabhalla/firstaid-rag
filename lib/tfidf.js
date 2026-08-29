// lib/tfidf.js
// Lightweight TF-IDF index + cosine similarity search over the first aid
// dataset — used alongside Pinecone semantic search for hybrid retrieval.

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

export function buildTfidfIndex(documents) {
  // documents: [{ id, text }]
  const df = new Map() // term -> number of docs containing it
  const docTokens = documents.map((doc) => {
    const tokens = tokenize(doc.text)
    new Set(tokens).forEach((t) => df.set(t, (df.get(t) || 0) + 1))
    return { id: doc.id, tokens }
  })

  const N = documents.length
  const idf = new Map()
  df.forEach((count, term) => {
    idf.set(term, Math.log((N + 1) / (count + 1)) + 1)
  })

  const docVectors = docTokens.map(({ id, tokens }) => {
    const tf = new Map()
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1))
    const vector = new Map()
    tf.forEach((count, term) => {
      vector.set(term, (count / tokens.length) * (idf.get(term) || 0))
    })
    return { id, vector }
  })

  return { docVectors, idf }
}

function cosineSim(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0
  vecA.forEach((w, term) => {
    normA += w * w
    if (vecB.has(term)) dot += w * vecB.get(term)
  })
  vecB.forEach((w) => { normB += w * w })
  if (normA === 0 || normB === 0) return 0
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export function tfidfSearch(query, index, topK = 5) {
  const tokens = tokenize(query)
  const tf = new Map()
  tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1))
  const queryVector = new Map()
  tf.forEach((count, term) => {
    const weight = (count / tokens.length) * (index.idf.get(term) || 0)
    if (weight > 0) queryVector.set(term, weight)
  })

  return index.docVectors
    .map(({ id, vector }) => ({ id, score: cosineSim(queryVector, vector) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}