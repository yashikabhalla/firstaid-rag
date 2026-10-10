# FirstAid RAG Assistant

A safety-focused **Retrieval-Augmented Generation (RAG) web application** for answering first-aid and emergency-related questions using a curated medical knowledge base, semantic retrieval, confidence-based abstention, and rule-based safety detection.

The application is designed to prioritize **retrieval quality and safe routing** over simply generating an answer for every question.

**Live Demo:** https://firstaid-rag-ten.vercel.app/  
**GitHub:** https://github.com/yashikabhalla/firstaid-rag

---

## Overview

FirstAid RAG Assistant combines a curated first-aid knowledge base with semantic search and an LLM to provide grounded responses.

Instead of sending every user question directly to an LLM, the application follows a controlled pipeline:

1. Detect potential self-harm or crisis situations.
2. Detect potentially life-threatening emergencies.
3. Generate a semantic embedding for normal questions.
4. Retrieve relevant medical information from Pinecone.
5. Apply a confidence threshold to determine whether the retrieved context is strong enough.
6. Filter the most relevant sources.
7. Generate an answer using the retrieved context.
8. Return the answer together with source information.

When retrieval confidence is too low, the system **does not call the LLM** and instead returns a low-confidence response.

---

## Key Features

- **RAG-based first-aid question answering**
- **84 hand-authored medical entries**
- Knowledge base organized across **26 topic sections**
- Semantic retrieval using **Cohere embeddings**
- Vector search using **Pinecone**
- Confidence-based retrieval gate
- Low-confidence abstention without an LLM call
- Relevant source filtering before generation
- Rule-based emergency detection
- Rule-based crisis/self-harm detection
- Region-aware emergency and crisis information
- Source links returned with answers
- Markdown-formatted medical responses
- Deployed full-stack application
- Automated safety regression tests
- Retrieval evaluation benchmark
- Comparison of semantic and hybrid retrieval approaches

---

## System Architecture

```text
                         User Question
                              |
                              v
                    +-------------------+
                    |   Crisis Check    |
                    +-------------------+
                              |
                    Crisis detected?
                       /          \
                     Yes           No
                      |             |
                      v             v
              Crisis Response   Emergency Check
                                   |
                          Emergency detected?
                             /          \
                           Yes           No
                            |             |
                            v             v
                    Emergency Response  Cohere
                                        Embedding
                                           |
                                           v
                                      Pinecone
                                      Retrieval
                                           |
                                           v
                                  Confidence Gate
                                   score >= 0.55?
                                  /            \
                                No              Yes
                                |                |
                                v                v
                       Low-Confidence     Source Filtering
                           Response              |
                                                 v
                                             Groq LLM
                                                 |
                                                 v
                                          Answer + Sources
```

---

## How the RAG Pipeline Works

### 1. Crisis Detection

Crisis and self-harm patterns are checked before normal retrieval.

If a crisis situation is detected, the request is routed directly to the crisis response instead of going through embedding, Pinecone retrieval, or the LLM.

The detector includes:

- Direct English self-harm/suicide intent
- Indirect English crisis language
- Hindi/Hinglish patterns
- Hindi-script patterns
- Educational-question exclusions

Region-specific crisis resources are returned where applicable.

---

### 2. Emergency Detection

Potentially life-threatening situations are detected using rule-based patterns.

Examples include:

- Cardiac arrest
- Severe chest pain
- Stroke
- Unresponsiveness
- Not breathing
- Choking
- Drowning
- Severe bleeding
- Anaphylaxis
- Seizures
- Poisoning
- Overdose
- Collapse

Clearly educational questions are handled differently from questions describing an actual person or ongoing emergency.

---

### 3. Semantic Embedding

For normal questions, the application generates an embedding using:

`embed-english-v3.0`

from Cohere.

The user question is embedded with:

`input_type: search_query`

---

### 4. Pinecone Retrieval

The embedding is queried against the Pinecone vector index.

Production retrieval uses:

- `topK: 3`
- Metadata included with results
- Raw similarity scores

Stored metadata includes:

- Topic
- Source
- Source URL
- Content
- Keywords

---

### 5. Confidence Gate

The production system uses a minimum raw Pinecone similarity threshold of:

**0.55**

If the highest retrieved similarity score is below `0.55`:

- The LLM is not called.
- The system returns a low-confidence response.
- The application avoids generating an answer from weak retrieved context.

This is an important part of the system's safety design.

---

### 6. Relevant Source Filtering

When retrieval passes the confidence threshold, relevant results are selected using:

- Score >= `0.55`
- Score within `0.15` of the top retrieved score

This prevents weakly related results from being unnecessarily passed to the generation model.

---

### 7. LLM Generation

The retrieved information is provided to the Groq-hosted model:

`openai/gpt-oss-120b`

Generation configuration:

- Temperature: `0.3`
- Maximum tokens: `1024`

The system prompt instructs the model to:

- Use the retrieved verified information
- Mention relevant sources
- Avoid unsupported medical claims
- Redirect non-medical questions
- Recommend professional medical care for serious conditions
- Use numbered steps where appropriate
- Use the region-specific emergency number
- Include a medical disclaimer

---

## Knowledge Base

The knowledge base is stored in:

`data/firstaid.js`

It contains:

**84 hand-authored medical entries organized across 26 topic sections.**

Topics include areas such as:

- Bleeding and wounds
- Burns
- Breathing and airway emergencies
- Cardiac emergencies
- Bone and muscle injuries
- Head injuries
- Temperature emergencies
- Poisoning and overdose
- Bites and stings
- Allergic reactions
- Diabetes and seizures
- Stroke
- Mental health emergencies
- Ear and nose emergencies
- Childbirth emergencies
- Recovery position
- Common illnesses
- Pediatric emergencies
- Skin and wound infections
- Respiratory problems
- Urinary and abdominal problems
- Workplace and sports injuries
- Dental emergencies
- Pregnancy-related emergencies

Each entry contains structured information such as:

- `id`
- `topic`
- `source`
- `sourceUrl`
- `keywords`
- `content`

---

## Retrieval Evaluation

The project includes a retrieval evaluation harness in:

`scripts/evalRetrieval.mjs`

The evaluation compares:

1. Semantic retrieval
2. Hybrid semantic + keyword retrieval

The evaluation uses the production confidence threshold of `0.55`.

---

## 105-query Benchmark

The latest benchmark contains **105 questions**.

| Metric | Semantic Retrieval | Hybrid Retrieval |
|---|---:|---:|
| Top-1 Accuracy | **70.5% (74/105)** | 64.8% (68/105) |
| Top-3 Accuracy | **72.4% (76/105)** | 71.4% (75/105) |
| Abstentions | 46.7% (49/105) | 46.7% (49/105) |
| Confidently Incorrect | **3** | 9 |

### Result

The semantic baseline performed better than the tested hybrid approach on this benchmark.

Semantic retrieval achieved:

**72.4% Top-3 retrieval accuracy**

compared with:

**71.4% Top-3 retrieval accuracy**

for the hybrid approach.

The hybrid approach also produced more confidently incorrect top predictions:

- Semantic: **3**
- Hybrid: **9**

Therefore, the current production approach uses the semantic retrieval baseline rather than claiming an improvement from hybrid retrieval.

> These numbers measure retrieval performance, not overall medical-answer accuracy.

---

## Development Regression Evaluation

The project also includes a smaller development regression set containing **23 questions**.

### Semantic Retrieval

| Metric | Result |
|---|---:|
| Top-1 Accuracy | 69.6% (16/23) |
| Top-3 Accuracy | 69.6% (16/23) |
| Abstentions | 34.8% (8/23) |
| Confidently Incorrect | 0 |

### Hybrid Retrieval

| Metric | Result |
|---|---:|
| Top-1 Accuracy | 65.2% (15/23) |
| Top-3 Accuracy | 69.6% (16/23) |
| Abstentions | 34.8% (8/23) |
| Confidently Incorrect | 1 |

The development set is retained as a regression check, while the 105-query benchmark is the larger headline evaluation.

---

## Held-Out Smoke Test

A separate 12-question smoke test is also included.

### Semantic Retrieval

| Metric | Result |
|---|---:|
| Top-1 Accuracy | 66.7% (8/12) |
| Top-3 Accuracy | 75.0% (9/12) |
| Abstentions | 41.7% (5/12) |
| Confidently Incorrect | 1 |

### Hybrid Retrieval

| Metric | Result |
|---|---:|
| Top-1 Accuracy | 66.7% (8/12) |
| Top-3 Accuracy | 75.0% (9/12) |
| Abstentions | 41.7% (5/12) |
| Confidently Incorrect | 1 |

---

## Safety Design

The system intentionally separates safety-critical routing from normal RAG generation.

### Crisis Path

```text
User Question
     |
     v
Crisis Detection
     |
     v
Crisis Detected
     |
     +--> No Embedding
     |
     +--> No Pinecone Retrieval
     |
     +--> No LLM
     |
     v
Crisis Response
```

This allows urgent crisis-related requests to bypass the normal generation pipeline.

---

### Emergency Path

Emergency detection runs before normal retrieval and identifies potentially life-threatening situations.

When an emergency is detected:

- The application marks the request as an emergency.
- The region-specific emergency number is included in the response.
- The LLM is instructed to prioritize urgent emergency guidance.
- The normal RAG pipeline continues so the response can include relevant first-aid information.

```text
User Query
     |
     v
Emergency Detection
     |
     v
Emergency Detected
     |
     +----> Emergency instruction + regional emergency number
     |
     v
Semantic Retrieval
     |
     v
Confidence Gate
     |
     v
Groq LLM
     |
     v
Answer + Emergency Information
```

Emergency responses include the region-specific emergency number.

Configured emergency numbers include:

| Region | Emergency Number |
|---|---:|
| India | 112 |
| United States | 911 |
| United Kingdom | 999 |

---

### Low-Confidence Path

```text
User Question
     |
     v
Semantic Retrieval
     |
     v
Top Score < 0.55
     |
     v
No LLM Call
     |
     v
Low-Confidence / Abstention Response
```

This prevents the model from generating an answer when the retrieval system does not provide sufficiently strong supporting context.

---

## Region Handling

The application supports:

- India
- United States
- United Kingdom

The selected region is validated before being used.

The default region is:

**India**

Region-specific placeholders can be applied to retrieved content, including:

- Emergency number
- Poison information line
- Crisis resources

---

## Source Attribution

Retrieved knowledge-base entries contain source metadata and source URLs.

The application returns relevant sources alongside the generated response.

The UI displays these sources using dedicated source cards, allowing users to inspect the referenced information.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js / React |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Markdown Rendering | react-markdown |
| Embeddings | Cohere `embed-english-v3.0` |
| Vector Database | Pinecone |
| LLM | Groq `openai/gpt-oss-120b` |
| Deployment | Vercel |
| Retrieval | Semantic vector search |
| Safety Detection | Rule-based pattern matching |

---

## Project Structure

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
│   ├── globals.css
│   ├── layout.js
│   └── page.js
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
│   ├── evalQuestions.mjs
│   ├── evalRetrieval.mjs
│   ├── testEmergency.mjs
│   ├── testSafety.mjs
│   └── uploadData.mjs
│
├── public/
│
├── package.json
├── package-lock.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── postcss.config.mjs
└── README.md
```

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yashikabhalla/firstaid-rag.git
cd firstaid-rag
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file.

Required environment variables include:

```env
COHERE_API_KEY=your_cohere_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index
GROQ_API_KEY=your_groq_api_key
```

Do not commit API keys to GitHub.

---

## Uploading the Knowledge Base

The knowledge-base upload script is:

```bash
node scripts/uploadData.mjs
```

The script:

1. Loads the first-aid entries.
2. Prepares the text and metadata.
3. Generates document embeddings using Cohere.
4. Uploads the vectors and metadata to Pinecone.

Document embeddings use:

`embed-english-v3.0`

with:

`input_type: search_document`

---

## Running the Application

Start the Next.js development server with:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Running Safety Tests

### Crisis / Safety Tests

```bash
node scripts/testSafety.mjs
```

Current result:

**56 passed, 0 failed**

### Emergency Detection Tests

```bash
node scripts/testEmergency.mjs
```

Current result:

**44 passed, 0 failed**

These tests validate the rule-based safety and emergency detection logic.

---

## Running Retrieval Evaluation

Run the complete retrieval evaluation with:

```bash
node scripts/evalRetrieval.mjs
```

The evaluation includes:

- Development regression questions
- Held-out smoke-test questions
- 105-query benchmark
- Semantic retrieval
- Hybrid retrieval
- Top-1 accuracy
- Top-3 accuracy
- Abstention rate
- Confidently incorrect predictions

---

## Deployment

The application is deployed as a full-stack Next.js application on **Vercel**.

Production environment variables must be configured in the Vercel project settings.

The application requires valid credentials for:

- Cohere
- Pinecone
- Groq

The public deployment is available at:

https://firstaid-rag-ten.vercel.app/

---

## Important Engineering Decisions

### Why RAG Instead of Direct LLM Generation?

A direct LLM can generate plausible medical-sounding information without having a verified source available for every answer.

The RAG architecture instead retrieves relevant knowledge-base content first and provides that context to the generation model.

This helps ground responses in the project's curated information.

---

### Why a Confidence Threshold?

Retrieval is not guaranteed to find a relevant document for every question.

The `0.55` threshold provides an explicit decision point:

```text
Strong retrieval
      |
      v
Generate grounded response

Weak retrieval
      |
      v
Abstain
```

This is preferable to generating an answer from weak or unrelated context.

---

### Why Use Rule-Based Safety Detection?

Safety-critical patterns such as immediate danger or self-harm intent should not depend entirely on semantic retrieval or LLM interpretation.

The rule-based safety layer provides deterministic routing for known emergency and crisis patterns.

---

### Why Test Hybrid Retrieval?

The project includes a hybrid semantic + keyword retrieval experiment to evaluate whether lexical matching could improve retrieval for queries containing specific medical terms.

On the 105-query benchmark, however, the hybrid approach did not outperform the semantic baseline.

This demonstrates an important engineering principle:

> A more complicated retrieval strategy is not automatically a better retrieval strategy.

The measured benchmark results are used to guide the current design.

---

## Current Limitations

The project is a prototype and should not be treated as a replacement for professional medical care.

Current limitations include:

- Retrieval quality varies depending on how closely a user question matches the knowledge base.
- Some natural or indirect questions can result in abstention.
- The benchmark contains only 105 questions and should not be interpreted as comprehensive medical validation.
- Confident retrieval does not guarantee medical correctness.
- Rule-based safety detection can have coverage limitations.
- The knowledge base is intentionally limited rather than being a complete medical database.
- The system does not replace emergency services, doctors, or other qualified healthcare professionals.

---

## Future Improvements

Potential future improvements include:

- Expanding the evaluation benchmark
- Improving retrieval for indirect or conversational queries
- Adding more curated medical sources
- Improving query expansion
- Testing additional embedding models
- Improving reranking strategies
- Adding multilingual retrieval
- Expanding safety-pattern coverage
- Adding more automated regression tests
- Evaluating retrieval quality with larger and more diverse datasets
- Improving the UI for additional screen sizes

---

## Disclaimer

**This application is for informational and educational purposes only.**

It is not a substitute for professional medical advice, diagnosis, or treatment.

For a life-threatening emergency, contact the appropriate local emergency service immediately.

If someone is in immediate danger or experiencing a serious medical emergency, seek professional emergency assistance rather than relying on this application.

---

## Author

**Yashika Bhalla**

GitHub:  
https://github.com/yashikabhalla

Project:  
https://github.com/yashikabhalla/firstaid-rag

Live Demo:  
https://firstaid-rag-ten.vercel.app/
