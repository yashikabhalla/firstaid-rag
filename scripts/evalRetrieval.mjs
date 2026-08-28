// scripts/evalRetrieval.mjs
//
// WHAT THIS FILE DOES:
// Runs a labeled set of test questions through your retrieval pipeline and
// checks whether the CORRECT medical entry showed up in the top-3 results.
// Reports an accuracy percentage. It runs BOTH your baseline (semantic-only)
// and hybrid (semantic + keyword) retrieval, one after another, so you get
// both numbers in a single run.
//
// This is what turns "I added hybrid search" into "I measured a
// PERCENTAGE improvement from hybrid search" — the second one is what
// makes an interviewer believe you actually engineered something.
//
// HOW TO USE:
// Just run: node scripts/evalRetrieval.mjs
// (test questions and wiring are already filled in below)

// -----------------------------------------------------------------------
// STEP 0: Load your .env.local manually — this script runs outside Next.js,
// so it does NOT pick up your env vars automatically the way your app does.
// -----------------------------------------------------------------------
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createEmbedding } from "../lib/embeddings.js";
import { getPineconeIndex } from "../lib/pinecone.js";
import { buildTfidfIndex } from "../lib/tfidf.js";
import { hybridSearch } from "../lib/hybridSearch.js";
import firstAidData from "../data/firstaid.js";

// Build the TF-IDF index once, reused across every test question.
const tfidfDocs = firstAidData.map((entry) => ({
  id: entry.id,
  text: `${entry.topic} ${entry.keywords.join(" ")} ${entry.content}`,
}));
const tfidfIndex = buildTfidfIndex(tfidfDocs);

// -----------------------------------------------------------------------
// STEP 1: Your labeled test set. These ids are copied EXACTLY from your
// real data/firstaid.js entries.
// -----------------------------------------------------------------------
const TEST_QUESTIONS = [
  { query: "what do I do if someone is choking", expectedId: "choke-001" },
  { query: "how to treat a severe nosebleed", expectedId: "bleed-003" },
  { query: "signs of a stroke and what to do", expectedId: "stroke-001" },
  { query: "someone collapsed and isn't breathing, chest compressions", expectedId: "cpr-001" },
  { query: "person stung by a bee having trouble breathing", expectedId: "allergy-001" },
  { query: "child having uncontrolled shaking convulsions", expectedId: "seizure-001" },
  { query: "how to treat a large deep burn with blisters", expectedId: "burn-002" },
  { query: "snake bit my friend on the leg", expectedId: "snakebite-001" },
  { query: "someone took too many pills accidentally", expectedId: "overdose-001" },
  { query: "chest pain and shortness of breath", expectedId: "heart-001" },
  { query: "feeling of impending doom, racing heart, can't breathe", expectedId: "panic-001" },
  { query: "how to use an EpiPen for allergic reaction", expectedId: "allergy-001" },
  { query: "using an AED on someone", expectedId: "aed-001" },
  { query: "frostbite on fingers turning white and hard", expectedId: "frostbite-001" },
  { query: "person passed out from the heat outside, confused", expectedId: "heat-001" },
  { query: "dislocated shoulder after a fall", expectedId: "dislocation-001" },
  { query: "swallowed something poisonous by accident", expectedId: "poison-001" },
  { query: "sudden face drooping and slurred speech", expectedId: "stroke-001" },
  { query: "dog bit my hand and it's bleeding", expectedId: "animalbite-001" },
  { query: "how to remove a tick from skin", expectedId: "tickbite-001" },
  { query: "baby is choking on something", expectedId: "choke-003" },
  { query: "someone fainted and passed out briefly", expectedId: "faint-001" },
  { query: "kid put a bead up their nose", expectedId: null }, // deliberately out-of-scope: tests whether system honestly says "no info" instead of guessing
];

// -----------------------------------------------------------------------
// STEP 2: The two retrieval functions, wired to your real code.
// -----------------------------------------------------------------------

/**
 * BASELINE: your current semantic-only retrieval (Cohere + Pinecone).
 */
async function semanticOnlyRetrieve(query) {
  const vector = await createEmbedding(query);
  const index = await getPineconeIndex();
  const results = await index.query({
    vector,
    topK: 3,
    includeMetadata: true,
  });
  return results.matches.map((match) => match.id);
}

/**
 * HYBRID: semantic (Pinecone) + keyword (TF-IDF) combined.
 */
async function hybridRetrieve(query) {
  const vector = await createEmbedding(query);
  const index = await getPineconeIndex();
  const pineconeResults = await index.query({
    vector,
    topK: 10, // wider net so hybrid has room to re-rank before picking top 3
    includeMetadata: true,
  });
  const semanticResults = pineconeResults.matches.map((m) => ({
    id: m.id,
    score: m.score,
  }));

  const results = hybridSearch(semanticResults, query, tfidfIndex, {
    semanticWeight: 0.7,
    keywordWeight: 0.3,
    topK: 3,
  });
  return results.map((r) => r.id);
}

// -----------------------------------------------------------------------
// STEP 3: Scoring — don't need to touch this part.
// -----------------------------------------------------------------------
async function runEval(retrieveFn, label) {
  let correct = 0;
  const failures = [];

  for (const { query, expectedId } of TEST_QUESTIONS) {
    const topIds = await retrieveFn(query);
    const hit = expectedId === null
      ? topIds.length === 0
      : topIds.includes(expectedId);

    if (hit) {
      correct++;
    } else {
      failures.push({ query, expectedId, got: topIds });
    }
  }

  const accuracy = ((correct / TEST_QUESTIONS.length) * 100).toFixed(1);
  console.log(`\n=== ${label} ===`);
  console.log(`Accuracy: ${correct}/${TEST_QUESTIONS.length} (${accuracy}%)`);
  if (failures.length) {
    console.log("Failed cases (look for patterns here — this is your interview insight):");
    failures.forEach((f) =>
      console.log(`  - "${f.query}" | expected: ${f.expectedId} | got: [${f.got.join(", ")}]`)
    );
  }
  return accuracy;
}

async function main() {
  await runEval(semanticOnlyRetrieve, "Baseline (semantic only)");
  await runEval(hybridRetrieve, "Hybrid (semantic + TF-IDF)");
}

main().catch(console.error);