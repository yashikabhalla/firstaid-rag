
// scripts/evalRetrieval.mjs
// Evaluates semantic-only and hybrid retrieval against development, smoke-test,
// and independently phrased benchmark questions.
// Run from the firstaid-rag project root: node scripts/evalRetrieval.mjs

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createEmbedding } from "../lib/embeddings.js";
import { getPineconeIndex } from "../lib/pinecone.js";
import { buildTfidfIndex } from "../lib/tfidf.js";
import { hybridSearch } from "../lib/hybridSearch.js";
import firstAidData from "../data/firstaid.js";
import { EVAL_QUESTIONS } from "./evalQuestions.mjs";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";


// Persist embeddings so repeated evaluations don't call the API again.
const CACHE_PATH = fileURLToPath(
  new URL("./.embedding-cache.json", import.meta.url)
);

let embeddingCache = {};

try {
  embeddingCache = JSON.parse(
    await readFile(CACHE_PATH, "utf8")
  );
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

async function getCachedEmbedding(query) {
  if (embeddingCache[query]) {
    return embeddingCache[query];
  }

  const vector = await createEmbedding(query);

  embeddingCache[query] = vector;

  await writeFile(
    CACHE_PATH,
    JSON.stringify(embeddingCache),
    "utf8"
  );

  return vector;
}


// Keep aligned with the production confidence threshold in app/api/chat/route.js.
const MIN_CONFIDENCE = 0.55;

// Build the TF-IDF index once.
const tfidfDocs = firstAidData.map((entry) => ({
  id: entry.id,
  text: `${entry.topic} ${entry.keywords.join(" ")} ${entry.content}`,
}));

const tfidfIndex = buildTfidfIndex(tfidfDocs);

// Existing development regression set.
const DEV_QUESTIONS = [
  // Direct/clinical phrasing
  { query: "what do I do if someone is choking", expectedId: "choke-001" },
  { query: "how to treat a severe nosebleed", expectedId: "bleed-003" },
  { query: "how to use an EpiPen for allergic reaction", expectedId: "allergy-001" },
  { query: "using an AED on someone", expectedId: "aed-001" },
  { query: "how to remove a tick from skin", expectedId: "tickbite-001" },
  { query: "how to treat a large deep burn with blisters", expectedId: "burn-002" },
  { query: "frostbite on fingers turning white and hard", expectedId: "frostbite-001" },
  { query: "swallowed something poisonous by accident", expectedId: "poison-001" },
  { query: "baby is choking on something", expectedId: "choke-003" },
  { query: "how do you use narcan on someone", expectedId: "overdose-001" },

  // Natural/indirect phrasing
  { query: "my grandpa mixed up his medication and swallowed way more than prescribed", expectedId: "overdose-001" },
  { query: "got stung outside and now wheezing, this doesn't feel normal", expectedId: "allergy-001" },
  { query: "my son's whole body just started jerking and won't stop", expectedId: "seizure-001" },
  { query: "someone was working outside on a hot day and now seems out of it", expectedId: "heat-001" },
  { query: "fell off my bike and my arm looks weirdly out of its socket", expectedId: "dislocation-001" },
  { query: "my coworker's words came out garbled and one side of his mouth looks off", expectedId: "stroke-001" },
  { query: "sudden wave of dread, chest tight, heart pounding for no reason", expectedId: "panic-001" },
  { query: "someone collapsed and isn't breathing, chest compressions", expectedId: "cpr-001" },
  { query: "dog bit my hand and it's bleeding", expectedId: "animalbite-001" },
  { query: "snake bit my friend on the leg", expectedId: "snakebite-001" },
  { query: "someone fainted and passed out briefly", expectedId: "faint-001" },
  { query: "child having uncontrolled shaking convulsions", expectedId: "seizure-001" },

  // Out-of-scope
  { query: "kid put a bead up their nose", expectedId: null },
];

// Existing held-out smoke test.
// Keep these unchanged when tuning thresholds.
const TEST_QUESTIONS = [
  { query: "Someone is choking and cannot speak or cough. What should I do?", expectedId: "choke-001" },
  { query: "What are the first steps for a serious nosebleed?", expectedId: "bleed-003" },
  { query: "A person suddenly has facial drooping and slurred speech. What could this indicate?", expectedId: "stroke-001" },
  { query: "My friend is confused after being outside in extreme heat.", expectedId: "heat-001" },
  { query: "A child is having a seizure that will not stop.", expectedId: "seizure-001" },
  { query: "What should I do if someone may have taken too much medicine?", expectedId: "overdose-001" },
  { query: "Someone has chest tightness and is struggling to breathe after a bee sting.", expectedId: "allergy-001" },
  { query: "A person has a deep burn with large blisters.", expectedId: "burn-002" },
  { query: "What should I do if someone has a suspected broken arm?", expectedId: "fracture-001" },
  { query: "A person has collapsed and is not breathing normally.", expectedId: "cpr-001" },
  { query: "My child swallowed a small plastic bead and seems fine. What should I do?", expectedId: null },
  { query: "How can I remove a coffee stain from a cotton shirt?", expectedId: null },
];

// BASELINE: semantic-only retrieval.
async function semanticOnlyRetrieve(query) {
  const vector = await getCachedEmbedding(query);
  const index = await getPineconeIndex();

  const response = await index.query({
    vector,
    topK: 3,
    includeMetadata: true,
  });

  const topScore = response.matches[0]?.score ?? 0;

  console.log(
    `   [debug] "${query}" → ${response.matches
      .map((match) => `${match.id}:${match.score.toFixed(3)}`)
      .join(", ")}`
  );

  if (topScore < MIN_CONFIDENCE) return [];

  return response.matches.map((match) => ({
    id: match.id,
    score: match.score,
    gateScore: topScore,
  }));
}

// HYBRID: semantic retrieval + keyword-based TF-IDF re-ranking.
async function hybridRetrieve(query) {
  const vector = await getCachedEmbedding(query);
  const index = await getPineconeIndex();

  const response = await index.query({
    vector,
    topK: 10,
    includeMetadata: true,
  });

  const topRawScore = response.matches[0]?.score ?? 0;

  console.log(
    `   [debug] "${query}" → ${response.matches
      .slice(0, 3)
      .map((match) => `${match.id}:${match.score.toFixed(3)}`)
      .join(", ")}`
  );

  // Apply the confidence gate to the raw Pinecone score before re-ranking.
  if (topRawScore < MIN_CONFIDENCE) return [];

  const semanticResults = response.matches.map((match) => ({
    id: match.id,
    score: match.score,
  }));

  const results = hybridSearch(semanticResults, query, tfidfIndex, {
    semanticWeight: 0.7,
    keywordWeight: 0.3,
    topK: 3,
  });

  return results.map((result) => ({
  id: result.id,
  score: result.score,
  gateScore: topRawScore,
  }));
}

// Score a set of questions using top-1, top-3, abstention, and
// confidently incorrect prediction metrics.
async function runEval(retrieveFn, label, questions) {
  let top1Correct = 0;
  let top3Correct = 0;
  let abstentions = 0;
  let confidentlyIncorrect = 0;
  const failures = [];

  for (const { query, expectedId } of questions) {
    const results = await retrieveFn(query);
    const topIds = results.map((result) => result.id);
    const abstained = results.length === 0;

    if (abstained) {
      abstentions++;
    }

    // For out-of-scope questions, abstaining is correct.
    const top1Hit =
      expectedId === null
        ? abstained
        : topIds[0] === expectedId;

    const top3Hit =
      expectedId === null
        ? abstained
        : topIds.includes(expectedId);

    if (top1Hit) top1Correct++;
    if (top3Hit) top3Correct++;

    // Count confident incorrect top predictions.
    if (!top1Hit && results.length > 0) {
      const gateScore = results[0].gateScore ?? 0;

      if (gateScore >= MIN_CONFIDENCE) {
        confidentlyIncorrect++;
      }
    }

    if (!top1Hit || !top3Hit) {
      failures.push({
        query,
        expectedId,
        got: topIds,
        abstained,
      });
    }
  }

  const total = questions.length;
  const pct = (count) => ((count / total) * 100).toFixed(1);

  console.log(`\n=== ${label} ===`);
  console.log(`Questions: ${total}`);
  console.log(
    `Top-1 accuracy: ${top1Correct}/${total} (${pct(top1Correct)}%)`
  );
  console.log(
    `Top-3 accuracy: ${top3Correct}/${total} (${pct(top3Correct)}%)`
  );
  console.log(
    `Abstentions: ${abstentions}/${total} (${pct(abstentions)}%)`
  );
  console.log(
    `Confidently incorrect top predictions: ${confidentlyIncorrect}`
  );

  if (failures.length > 0) {
    console.log("Cases to investigate:");

    for (const item of failures) {
      console.log(
        `  - "${item.query}" | expected: ${item.expectedId} | ` +
        `got: [${item.got.join(", ")}]` +
        (item.abstained ? " | abstained" : "")
      );
    }
  }
}

async function main() {
  // Existing development regression set.
  await runEval(
    semanticOnlyRetrieve,
    "Baseline — development",
    DEV_QUESTIONS
  );

  await runEval(
    hybridRetrieve,
    "Hybrid — development",
    DEV_QUESTIONS
  );

  // Existing held-out smoke test.
  await runEval(
    semanticOnlyRetrieve,
    "Baseline — held-out smoke test",
    TEST_QUESTIONS
  );

  await runEval(
    hybridRetrieve,
    "Hybrid — held-out smoke test",
    TEST_QUESTIONS
  );

  // New 105-question benchmark.
  await runEval(
    semanticOnlyRetrieve,
    "Baseline — 105-question benchmark",
    EVAL_QUESTIONS
  );

  await runEval(
    hybridRetrieve,
    "Hybrid — 105-question benchmark",
    EVAL_QUESTIONS
  );
}

main().catch(console.error);
