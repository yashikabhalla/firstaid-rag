// lib/hybridSearch.js
//
// WHAT THIS FILE DOES:
// Runs your EXISTING semantic search (Pinecone) and the NEW keyword search
// (tfidf.js) side by side, then merges their results into one ranked list.
//
// WHY: Semantic search understands meaning but can under-rank documents that
// share exact critical terms with the query (e.g. "EpiPen", "AED", "CPR").
// Keyword search catches those exact matches but doesn't understand
// paraphrasing or meaning. Combining both gives you the strengths of each.

import { tfidfSearch } from "./tfidf.js";

/**
 * Combines semantic + keyword search results using weighted scoring.
 *
 * @param {Array<{id: string, score: number}>} semanticResults - from your
 *   existing Pinecone query (score = cosine similarity, roughly 0 to 1)
 * @param {string} query - the raw user question, needed to run TF-IDF search
 * @param {Object} tfidfIndex - prebuilt index from buildTfidfIndex()
 * @param {Object} options
 * @param {number} options.semanticWeight - default 0.7
 * @param {number} options.keywordWeight - default 0.3
 * @param {number} options.topK - how many final results to return, default 3
 * @returns {Array<{id: string, finalScore: number, semanticScore: number, keywordScore: number}>}
 */
export function hybridSearch(
  semanticResults,
  query,
  tfidfIndex,
  { semanticWeight = 0.7, keywordWeight = 0.3, topK = 3 } = {}
) {
  const keywordResults = tfidfSearch(query, tfidfIndex, 10);

  // Normalize each result set to 0-1 range so the two scores are comparable
  // before combining. Without this, TF-IDF scores (which have a different
  // natural range than cosine similarity) could unfairly dominate or be
  // drowned out.
    const normalize = (results) => {
    const scores = results.map((r) => r.score);
    const max = Math.max(...scores, 1e-9);
    return results.map((r) => ({ ...r, normScore: r.score / max }));
  };

  const normSemantic = normalize(semanticResults);
  const normKeyword = normalize(keywordResults);

  // Merge into a single map keyed by document id
  const combined = new Map();

  normSemantic.forEach((r) => {
    combined.set(r.id, {
      id: r.id,
      semanticScore: r.normScore,
      keywordScore: 0,
    });
  });

  normKeyword.forEach((r) => {
    const existing = combined.get(r.id);
    if (existing) {
      existing.keywordScore = r.normScore;
    } else {
      combined.set(r.id, {
        id: r.id,
        semanticScore: 0,
        keywordScore: r.normScore,
      });
    }
  });

  // Weighted sum -> final ranking score
  const results = Array.from(combined.values()).map((r) => ({
    ...r,
    finalScore: semanticWeight * r.semanticScore + keywordWeight * r.keywordScore,
  }));

  return results.sort((a, b) => b.finalScore - a.finalScore).slice(0, topK);
}