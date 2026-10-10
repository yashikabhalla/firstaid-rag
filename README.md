# 🏥 FirstAid RAG Assistant

> A safety-focused Retrieval-Augmented Generation (RAG) assistant that provides first-aid guidance grounded in a curated knowledge base of verified medical sources.

🔗 **Live Demo:** https://firstaid-rag-ten.vercel.app/  
📁 **GitHub:** https://github.com/yashikabhalla/firstaid-rag

---

## 🎯 Overview

FirstAid RAG Assistant is an AI-powered first-aid chatbot designed to reduce the risk of unreliable medical responses from general-purpose LLMs.

Instead of allowing an LLM to answer directly from its training knowledge, the system:

1. Detects crisis/self-harm queries before entering the RAG pipeline.
2. Converts the user's question into a semantic embedding using Cohere.
3. Searches a curated medical knowledge base stored in Pinecone.
4. Applies a raw cosine-similarity confidence threshold.
5. Filters retrieved sources to keep only sufficiently relevant matches.
6. Passes the verified medical context to Groq for grounded generation.
7. Returns a concise response with source citations and region-specific emergency information.

If the system does not have sufficiently confident verified guidance, it abstains rather than guessing.

---

## ✨ Key Features

### 🔍 Retrieval-Augmented Generation

Uses semantic vector search to retrieve relevant medical guidance before generation.

The LLM does not answer medical questions from its training knowledge alone. Retrieved medical content is explicitly supplied as context.

### 🎯 Confidence-Gated Answers

The production pipeline uses a **0.55 raw Pinecone cosine-similarity threshold**.

If the strongest retrieved result falls below the threshold:

- The LLM is not called.
- The system returns a low-confidence response.
- No unsupported medical answer is generated.

This deliberately favors **abstention over potentially unsafe generation**.

### 📚 Relevant-Source Filtering

After the confidence gate passes, retrieved results are filtered again.

A result must:

- Meet the minimum confidence threshold of `0.55`
- Be within `0.15` of the best retrieved score

This prevents weaker, unrelated results from being unnecessarily included in the LLM context.

### 🆘 Crisis Safety Bypass

Self-harm and suicide-related queries are detected **before**:

- Embedding generation
- Pinecone retrieval
- LLM generation

Detected crisis queries receive a fixed response containing region-specific crisis resources.

The detector supports:

- Direct English expressions
- Indirect English expressions
- Hindi/Hinglish patterns
- Hindi script patterns

Educational questions such as questions about suicide prevention or warning signs are excluded from the personal-crisis path.

### 🚨 Emergency Detection

The application detects potentially urgent situations such as:

- Heart attack
- Cardiac arrest
- Chest pain
- Choking
- Severe bleeding
- Stroke
- Drowning
- Anaphylaxis
- Overdose
- Poisoning
- Seizure
- Unconsciousness
- Unresponsiveness
- No pulse / no heartbeat
- Collapse

Emergency detection is deliberately conservative: general educational questions are separated from messages describing an actual person or ongoing emergency.

### 🌍 Region-Aware Emergency Information

Users can select their region:

- 🇮🇳 India
- 🇺🇸 United States
- 🇬🇧 United Kingdom

The selected region determines:

- Emergency number
- Poison-control information
- Crisis-support information

Current emergency numbers:

| Region         | Emergency |
|----------------|-----------|
| India          | **112**   |
| United States  | **911**   |
| United Kingdom | **999**   |

The selected region is stored locally so it persists between visits.

### 📚 Source Citations

Generated responses display the medical sources used to construct the answer, with links to the original source.

Primary sources include:

- American Red Cross
- Mayo Clinic
- NHS
- CDC

### 🟠 Low-Confidence UI

Queries that fail the retrieval confidence gate are displayed as a distinct low-confidence response rather than being presented like verified medical answers.

### 📊 Retrieval Evaluation

The project includes a labeled retrieval evaluation harness covering:

- Direct clinical phrasing
- Natural/indirect symptom descriptions
- Out-of-scope queries
- Semantic-only retrieval
- Hybrid semantic + TF-IDF retrieval

### 🧪 Automated Safety Tests

The project includes dedicated test scripts for the two most safety-critical rule-based components:

- `testSafety.mjs` — crisis/self-harm detection
- `testEmergency.mjs` — emergency detection

Both scripts test positive cases and negative cases to catch false negatives and false positives.

Run both with:

```bash
npm test
```

---

## 🏗️ Architecture

```text
                          User Question
                                │
                                ▼
                    ┌─────────────────────┐
                    │  Crisis Detection   │
                    └──────────┬──────────┘
                               │
                    crisis? ───┴── yes ───► Fixed Crisis Response
                               │
                              no
                               ▼
                    ┌─────────────────────┐
                    │ Emergency Detection │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Cohere Embeddings   │
                    │ 1024-dim vector     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Pinecone Vector DB  │
                    │     Top-K = 3       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Confidence Gate     │
                    │ raw score >= 0.55   │
                    └──────────┬──────────┘
                               │
                    low score? ┴── yes ───► Abstain
                               │
                              pass
                               ▼
                    ┌─────────────────────┐
                    │ Relevant Source     │
                    │ Filtering           │
                    │ within 0.15 of      │
                    │ best match          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Prompt Augmentation │
                    │ Verified Context    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Groq GPT-OSS-120B   │
                    │ temperature = 0.3   │
                    └──────────┬──────────┘
                               │
                               ▼
              Answer + Sources + Emergency Information
```

> Crisis queries bypass the RAG pipeline entirely.

---

## 🛠️ Tech Stack

| Layer           | Technology                      | Purpose                                   |
|-----------------|---------------------------------|-------------------------------------------|
| Frontend        | Next.js 14, React, Tailwind CSS | Chat interface and UI                     |
| Embeddings      | Cohere `embed-english-v3.0`     | Semantic query representation             |
| Vector Database | Pinecone                        | 1024-dimensional cosine similarity search |
| LLM             | Groq `openai/gpt-oss-120b`      | Grounded answer generation                |
| Deployment      | Vercel                          | Production hosting and GitHub deployment  |

---

## 📚 Knowledge Base

The application uses **84 hand-authored medical entries across 16 categories**.

### Categories

| Category           | Examples                                                            |
|--------------------|---------------------------------------------------------------------|
| Bleeding & Wounds  | Cuts, severe bleeding, nosebleed, knocked-out tooth, eye injury     |
| Burns              | Minor, severe, chemical, electrical, sunburn                        |
| Breathing & Airway | Choking, asthma attack, drowning                                    |
| Cardiac & CPR      | CPR, heart attack, AED usage                                        |
| Bone & Muscle      | Fractures, sprains, dislocation, spinal injury                      |
| Head Injuries      | Concussion, skull fracture                                          |
| Temperature        | Heat stroke, hypothermia, frostbite                                 |
| Poisoning          | Swallowed poison, carbon monoxide, drug overdose, alcohol poisoning |
| Bites & Stings     | Insect sting, snake bite, animal bite, tick bite, spider bite       |
| Allergic Reaction  | Anaphylaxis, hives                                                  |
| Diabetic & Seizure | Hypoglycemia, hyperglycemia, seizure                                |
| Stroke             | FAST method recognition                                             |
| Mental Health      | Panic attack, hyperventilation, suicide crisis, self-harm           |
| Common Illnesses   | Cold, flu, fever, stomach ache, vomiting, headache, diarrhea        |
| Pediatric          | Febrile seizure, croup, meningitis in children                      |
| Dental & Other     | Toothache, dental abscess, back pain, kidney stone, UTI             |

Each entry contains structured metadata such as:

```text
id
topic
content
source
sourceUrl
keywords
```

The entries are already curated as relatively atomic pieces of guidance, so a traditional document-chunking pipeline is not required for the current dataset.

### Primary Sources

- American Red Cross
- Mayo Clinic
- NHS
- CDC

---

## 📊 Retrieval Evaluation

A labeled evaluation harness is included in:

```text
scripts/evalRetrieval.mjs
```

The evaluation contains **23 test queries** covering both direct clinical terminology and natural, indirect descriptions of symptoms.

### Final Evaluation Result

| Metric                             | Result        |
|------------------------------------|---------------|
| Test queries                       | 23            |
| Top-3 retrieval accuracy           | 69.6% (16/23) |
| Failed cases that abstained safely | 100%          |
| Clinical/direct phrasing           | ~90%+         |
| Natural/indirect phrasing          | ~45%          |

### Key Finding

Retrieval performance is substantially better when users use clinical terminology than when they describe symptoms naturally.

For example:

> "How do I use an EpiPen?"

is easier for the retriever than an indirect description such as:

> "My coworker's words came out garbled and one side of his mouth looks off."

This is an important limitation for first-aid software because real users may describe symptoms without knowing medical terminology.

---

## 🧪 Hybrid Retrieval Experiment

The project also includes an experimental hybrid retriever combining:

- Semantic similarity
- TF-IDF keyword similarity

The motivation was that exact medical terms such as `EpiPen`, `AED`, or `Narcan` might benefit from keyword matching.

### Result

The hybrid approach did not produce a measurable improvement over semantic-only retrieval under the production safety constraints.

The hybrid implementation is retained for experimentation in:

```text
lib/hybridSearch.js
lib/tfidf.js
```

but semantic-only retrieval remains the production approach.

### Important Engineering Finding: Score Normalization

During experimentation, an important issue was discovered with query-relative score normalization.

If each result is normalized against the maximum score in the current result set, the best result can appear close to `1.0` even when the underlying semantic match is weak.

Therefore:

> The production safety gate uses the raw Pinecone similarity score.

Hybrid scoring is used only for experimental re-ranking.

---

## 🔐 Safety Design

The application intentionally separates different classes of responses.

### Normal Response

```text
Retrieved verified content
        ↓
Relevant source filtering
        ↓
Groq LLM
        ↓
Answer + sources
```

### Low-Confidence Response

```text
Weak retrieval
        ↓
NO LLM CALL
        ↓
Abstention message
```

### Crisis Response

```text
Crisis detected
        ↓
NO embedding
        ↓
NO Pinecone retrieval
        ↓
NO LLM call
        ↓
Fixed crisis response
```

### Emergency Response

```text
Emergency detected
        ↓
Region-specific emergency information
        ↓
Urgent response + emergency call action
```

This separation prevents crisis and low-confidence responses from being treated like ordinary generated answers.

---

## 🧪 Safety & Emergency Testing

The project includes dedicated automated scripts for testing the rule-based safety layer.

### Crisis Detection Tests

```text
scripts/testSafety.mjs
```

The test suite checks:

- Direct suicidal statements
- Indirect suicidal statements
- Self-harm intent
- Hindi/Hinglish crisis expressions
- Hindi-script expressions
- Educational suicide-prevention questions
- Normal first-aid questions
- Benign uses of phrases such as "hurt myself"

The script exits with a failure status if any expected case fails.

### Emergency Detection Tests

```text
scripts/testEmergency.mjs
```

The test suite checks:

- Heart attack
- Chest pain
- Cardiac arrest
- No pulse
- Unconsciousness
- Choking
- Drowning
- Seizure
- Severe bleeding
- Anaphylaxis
- Overdose
- Poisoning
- Stroke
- Collapse
- Educational questions that should NOT trigger an emergency alert

Both positive and negative cases are included to reduce false negatives and false positives.

Run both test suites with:

```bash
npm test
```

---

## 📁 Project Structure

```text
firstaid-rag/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js
│   │
│   ├── components/
│   │   ├── ChatMessage.js
│   │   ├── CrisisBanner.js
│   │   ├── EmergencyBanner.js
│   │   ├── LoadingDots.js
│   │   ├── LowConfidenceBanner.js
│   │   ├── Markdown.js
│   │   └── SourceCard.js
│   │
│   ├── page.js
│   ├── layout.js
│   └── globals.css
│
├── data/
│   └── firstaid.js
│
├── lib/
│   ├── embeddings.js
│   ├── emergency.js
│   ├── hybridSearch.js
│   ├── pinecone.js
│   ├── region.js
│   ├── safety.js
│   └── tfidf.js
│
├── scripts/
│   ├── uploadData.mjs
│   ├── evalRetrieval.mjs
│   ├── evalQuestions.mjs
│   ├── testSafety.mjs
│   └── testEmergency.mjs
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- Groq API key
- Pinecone API key
- Cohere API key

### Installation

```bash
git clone https://github.com/yashikabhalla/firstaid-rag.git
cd firstaid-rag
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=firstaid-rag
COHERE_API_KEY=your_cohere_api_key
```

> **Never commit `.env.local` or API keys to GitHub.**

### Pinecone Setup

Create a Pinecone index with:

```text
Name: firstaid-rag
Dimensions: 1024
Metric: cosine
```

The embeddings are generated using Cohere's:

```text
embed-english-v3.0
```

### Upload the Knowledge Base

Run:

```bash
node scripts/uploadData.mjs
```

This converts the medical entries into embeddings and uploads them to Pinecone.

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Run Tests

Run the safety and emergency test suites:

```bash
npm test
```

Run the retrieval evaluation:

```bash
node scripts/evalRetrieval.mjs
```

---

## ☁️ Deployment

The application is deployed on Vercel and connected to the GitHub repository.

Required production environment variables:

```text
GROQ_API_KEY
PINECONE_API_KEY
PINECONE_INDEX
COHERE_API_KEY
```

The API keys are stored as environment variables and are not included in the repository.

---

## 🧠 Key Engineering Decisions

### Why RAG instead of fine-tuning?

RAG allows the medical knowledge base to be updated independently of the LLM and makes the information used for generation traceable to specific sources.

### Why Pinecone?

Pinecone provides vector similarity search suitable for retrieving semantically relevant medical entries from the knowledge base.

### Why Cohere embeddings?

`embed-english-v3.0` converts the user's question into a semantic vector, allowing the system to retrieve conceptually related medical guidance rather than relying only on exact keyword matches.

### Why a confidence threshold?

A vector database will always return nearest neighbors, even when none are actually relevant.

The confidence gate separates:

> "I found something."

from:

> "I found something sufficiently similar to trust."

The production threshold is:

```text
raw cosine similarity >= 0.55
```

### Why filter retrieved sources?

Even when the top result is strong, other retrieved results may be significantly weaker.

The system therefore keeps only results that:

```text
score >= 0.55
```

AND

```text
score >= best_score - 0.15
```

This keeps the LLM context focused on the strongest retrieved medical guidance.

### Why bypass the LLM for crisis queries?

Even if a mental-health document is retrieved from the knowledge base, allowing an LLM to freely generate a crisis response introduces unnecessary risk.

The system therefore detects crisis queries first and uses a fixed region-aware response.

### Why use rule-based emergency detection?

Emergency detection needs predictable behavior for critical situations.

The system therefore uses predefined emergency patterns and explicitly distinguishes:

- Actual/ongoing emergencies
- General educational questions

### Why keep hybrid search out of production?

The evaluation did not demonstrate a measurable improvement over semantic-only retrieval under the same safety constraints.

The simpler semantic-only approach was therefore retained for production.

---

## 💡 What I Learned Building This

- How RAG architecture works end to end: embedding, retrieval, augmentation, and generation
- The difference between keyword search and semantic vector search
- How vector databases perform similarity search using high-dimensional embeddings
- Why embedding model choice affects retrieval quality
- How to design confidence-based abstention for a high-stakes application
- How to separate deterministic safety logic from LLM generation
- How to build and run a labeled retrieval evaluation harness
- How to test safety-critical rule-based classifiers with both positive and negative cases
- How to analyze retrieval failures rather than assuming RAG will always work
- How hybrid retrieval can fail to improve a system despite appearing theoretically useful
- How score normalization can distort confidence interpretation
- How to manage API keys and environment variables securely
- How to deploy a Next.js application with Vercel

---

## ⚠️ Known Limitations

1. Natural-language retrieval is weaker than clinical phrasing. Query rewriting or expansion is the most promising next improvement.
2. Crisis detection is pattern-based. It cannot guarantee detection of every possible indirect expression.
3. Emergency detection is rule-based. It may not capture every possible way a user describes an emergency.
4. The knowledge base is relatively small and hand-authored.
5. There is no automated final groundedness check verifying that every generated statement is directly supported by retrieved content.
6. No conversation memory is currently maintained between independent questions.
7. The evaluation dataset is relatively small, so the reported retrieval accuracy should be treated as a directional measurement rather than a production benchmark.

---

## 🔮 Future Improvements

- Query rewriting for natural/indirect symptom descriptions
- Larger and independently authored evaluation datasets
- Automated groundedness and citation verification
- More robust crisis classification
- More robust emergency classification
- Expanded regional coverage
- Conversation-aware follow-up questions
- Retrieval monitoring and production observability
- More extensive adversarial safety testing

---

## ⚠️ Disclaimer

This application provides first-aid guidance for educational purposes based on publicly available medical information.

It is not a substitute for professional medical advice, diagnosis, or treatment.

For serious or life-threatening situations, contact your local emergency services or seek professional medical care.

For mental-health crisis queries, the application routes users to dedicated crisis resources rather than attempting to generate crisis guidance.

---

## 👩‍💻 Built By

**Yashika Bhalla**

FirstAid RAG Assistant — Retrieval, Safety & Evaluation focused AI project.

---

## 📚 Sources

- American Red Cross
- Mayo Clinic
- NHS
- CDC
