// lib/tfidf.js
//
// WHAT THIS FILE DOES (in plain terms):
// Your existing pipeline finds documents by MEANING (Cohere embeddings + Pinecone).
// This file finds documents by EXACT WORD MATCHES instead.
// TF-IDF = Term Frequency - Inverse Document Frequency.
//   - Term Frequency: how often a word appears in ONE document
//   - Inverse Document Frequency: how RARE that word is across ALL documents
//     (common words like "the" or "pain" get a low score, rare specific
//      words like "anaphylaxis" or "EpiPen" get a high score)
// A word that appears often in one document, but rarely elsewhere, is a strong
// signal that the document is "about" that word. That's the whole idea.
//
// This is intentionally written with no external library (no sklearn-equivalent
// needed) so every line is something you can explain in an interview.

/**
 * Splits text into lowercase words, strips punctuation.
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1); // drop single letters/empty strings
}

/**
 * Builds a TF-IDF index from your medical entries.
 * @param {Array<{id: string, text: string}>} documents - your 84 medical entries,
 *   where `text` is the combined title + content you already embed with Cohere.
 * @returns {Object} index you can reuse for every search (build this ONCE at startup)
 */
export function buildTfidfIndex(documents) {
  const docTokens = documents.map((doc) => tokenize(doc.text));
  const totalDocs = documents.length;

  // 1. Document frequency: how many documents contain each word at least once
  const docFrequency = new Map();
  docTokens.forEach((tokens) => {
    const uniqueWords = new Set(tokens);
    uniqueWords.forEach((word) => {
      docFrequency.set(word, (docFrequency.get(word) || 0) + 1);
    });
  });

  // 2. IDF score per word: rarer words across the corpus get a higher score
  const idf = new Map();
  docFrequency.forEach((count, word) => {
    idf.set(word, Math.log(totalDocs / count));
  });

  // 3. TF-IDF vector per document: term frequency in that doc * idf of that word
  const docVectors = documents.map((doc, i) => {
    const tokens = docTokens[i];
    const termFreq = new Map();
    tokens.forEach((word) => {
      termFreq.set(word, (termFreq.get(word) || 0) + 1);
    });

    const vector = new Map();
    termFreq.forEach((count, word) => {
      const tf = count / tokens.length; // normalize by doc length
      vector.set(word, tf * (idf.get(word) || 0));
    });

    return { id: doc.id, vector };
  });

  return { docVectors, idf };
}

/**
 * Cosine similarity between two sparse vectors (Maps of word -> score).
 * Same math concept as the cosine similarity Pinecone uses internally —
 * here you're doing it yourself on word-frequency vectors instead of
 * Cohere's semantic embedding vectors.
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  vecA.forEach((valA, word) => {
    magA += valA * valA;
    if (vecB.has(word)) dot += valA * vecB.get(word);
  });
  vecB.forEach((valB) => {
    magB += valB * valB;
  });

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Searches the TF-IDF index for the documents most relevant to a query,
 * by exact/near-exact keyword overlap.
 * @param {string} query - the user's question
 * @param {Object} index - output of buildTfidfIndex()
 * @param {number} topK - how many results to return
 * @returns {Array<{id: string, score: number}>}
 */
export function tfidfSearch(query, index, topK = 5) {
  const queryTokens = tokenize(query);
  const termFreq = new Map();
  queryTokens.forEach((word) => {
    termFreq.set(word, (termFreq.get(word) || 0) + 1);
  });

  const queryVector = new Map();
  termFreq.forEach((count, word) => {
    const tf = count / queryTokens.length;
    queryVector.set(word, tf * (index.idf.get(word) || 0));
  });

  const scored = index.docVectors.map((doc) => ({
    id: doc.id,
    score: cosineSimilarity(queryVector, doc.vector),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}