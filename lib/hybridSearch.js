
 // lib/hybridSearch.js
//
// Combines semantic (Pinecone) and keyword (TF-IDF) results using
// Reciprocal Rank Fusion (RRF).
//
// RRF combines rank positions instead of normalizing scores independently.

import { tfidfSearch } from "./tfidf.js";

export function hybridSearch(
  semanticResults,
  query,
  tfidfIndex,
  { semanticWeight = 0.7, keywordWeight = 0.3, topK = 3 } = {}
) {
  const keywordResults = tfidfSearch(query, tfidfIndex, 10);
  const combined = new Map();

  // Add semantic results.
  semanticResults.forEach((result, index) => {
    combined.set(result.id, {
      id: result.id,
      semanticScore: result.score,
      keywordScore: 0,
      semanticRank: index + 1,
      keywordRank: null,
      finalScore: semanticWeight / (60 + index + 1),
    });
  });

  // Add keyword results and fuse their rank contributions.
  keywordResults.forEach((result, index) => {
    const rank = index + 1;
    const existing = combined.get(result.id);

    if (existing) {
      existing.keywordScore = result.score;
      existing.keywordRank = rank;
      existing.finalScore += keywordWeight / (60 + rank);
    } else {
      combined.set(result.id, {
        id: result.id,
        semanticScore: 0,
        keywordScore: result.score,
        semanticRank: null,
        keywordRank: rank,
        finalScore: keywordWeight / (60 + rank),
      });
    }
  });

  return Array.from(combined.values())
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, topK)
    .map((result) => ({
      ...result,
      score: result.finalScore,
    }));
}
