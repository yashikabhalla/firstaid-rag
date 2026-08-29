# 🏥 FirstAid RAG Assistant

> An AI-powered first aid chatbot using RAG (Retrieval-Augmented Generation) that retrieves verified medical information before generating answers, with a confidence threshold and crisis-detection safeguards to reduce the risk of unreliable or unsafe responses.

🔗 **Live Demo:** https://firstaid-rag-ten.vercel.app  
📁 **GitHub:** https://github.com/yashikabhalla/firstaid-rag

---

## 🎯 The Problem This Solves

Most AI chatbots answer medical questions from training memory and can **hallucinate** — confidently giving wrong information. For first aid, wrong answers can be dangerous.

**This app solves it by:**
1. Converting your question to a semantic vector using Cohere
2. Searching a verified medical database in Pinecone
3. Retrieving the actual Red Cross / Mayo Clinic / NHS protocol
4. Giving that retrieved content to Groq as context
5. Generating a sourced answer grounded in the retrieved medical information

If no relevant information is retrieved with sufficient confidence, the assistant 
honestly says so rather than guessing — and queries indicating a mental health 
crisis are routed to verified crisis resources instead of the RAG pipeline entirely.

---

## ✨ Features

- 🔍 **RAG Architecture** — retrieves real medical data before generating, not a ChatGPT wrapper
- 📋 **Source Citations** — every answer shows which organization it came from with a clickable link
- 🚨 **Emergency Detection** — identifies critical conditions using predefined emergency keywords and triggers an urgent 911 alert
- 🆘 **Crisis Safety Bypass** — self-harm/suicide-related queries skip the RAG pipeline entirely and route to a fixed response with verified helplines (Tele-MANAS, Vandrevala Foundation) — no LLM generation involved
- 🎯 **Confidence Thresholding** — responses only generate when retrieval confidence clears a validated threshold (0.55 cosine similarity); below that, the app says so honestly instead of guessing
- 🧠 **Semantic Search** — understands meaning, not just keywords (powered by Cohere embeddings)
- 📚 **80+ Medical Topics** — 84 entries across 16 categories from verified sources
- 💰 **$0 Cost** — entire stack runs on free tiers

---

## 🏗️ RAG Pipeline

*Note: crisis/self-harm queries are intercepted before this pipeline even 
starts and routed directly to a fixed safety response.*

```markdown
User Question
│
▼
┌─────────────────┐
│  Cohere Embed   │  question → 1024-dimension semantic vector
└────────┬────────┘
│
▼
┌─────────────────┐
│    Pinecone     │  vector similarity search → top 3 matches
│  Vector Search  │  (cosine similarity across 84 medical entries)
└────────┬────────┘
│
▼
┌─────────────────┐
│ Confidence Gate │  if top score < 0.55 → return "not in database"
└────────┬────────┘
│
▼
┌─────────────────┐
│  Build Prompt   │  question + retrieved medical protocols
│  (Augmentation) │  injected as context
└────────┬────────┘
│
▼
┌─────────────────┐
│  Groq LLM       │  generates answer using retrieved medical context
│  GPT-OSS-120B   │  temperature: 0.3 for consistent responses
└────────┬────────┘
│
▼
Answer + Source Citations + Emergency Flag → UI

```
---


## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14, React, Tailwind CSS | Chat UI, routing, styling |
| AI Inference | Groq (GPT-OSS-120B) | Fast LLM inference |
| Embeddings | Cohere embed-english-v3.0 | Semantic text → vector conversion |
| Vector DB | Pinecone (1024 dimensions, cosine) | Similarity search across medical entries |
| Deployment | Vercel | Auto-deploy from GitHub, free hosting |

---

## 📚 Medical Categories Covered

| Category | Topics |
|----------|--------|
| Bleeding & Wounds | Cuts, severe bleeding, nosebleed, knocked out tooth, eye injury |
| Burns | Minor, severe, chemical, electrical, sunburn |
| Breathing | Choking (adult/child/infant), asthma attack, drowning |
| Cardiac & CPR | CPR (adult/child/infant), heart attack, AED usage |
| Bone & Muscle | Fractures, sprains, dislocation, spinal injury |
| Head Injuries | Concussion, skull fracture |
| Temperature | Heat stroke, hypothermia, frostbite |
| Poisoning | Swallowed poison, carbon monoxide, drug overdose, alcohol poisoning |
| Bites & Stings | Insect sting, snake bite, animal bite, tick bite, spider bite |
| Allergic Reaction | Anaphylaxis, hives |
| Diabetic & Seizure | Hypoglycemia, hyperglycemia, seizure |
| Stroke | FAST method recognition |
| Mental Health | Panic attack, hyperventilation, suicide crisis, self harm |
| Common Illnesses | Cold, flu, fever, stomach ache, vomiting, headache, diarrhea |
| Pediatric | Febrile seizure, croup, meningitis in children |
| Dental & Other | Toothache, dental abscess, back pain, kidney stone, UTI |

---
---

## 📊 Retrieval Evaluation

Built a labeled evaluation harness (`scripts/evalRetrieval.mjs`) with 23 test 
queries — a deliberate mix of direct/clinical phrasing ("how to use an EpiPen") 
and natural, indirect phrasing people actually use in distress ("my coworker's 
words came out garbled and one side of his mouth looks off") — to measure 
retrieval accuracy honestly rather than assume it.

- **Top-3 retrieval accuracy: 69.6%** (16/23)
- **100% safety compliance on failures**: every failed query correctly returned 
  "I don't have verified guidance for this" rather than confidently generating 
  a wrong or hallucinated answer — the confidence threshold (0.55 cosine 
  similarity) working as designed
- **Key finding**: accuracy correlates strongly with phrasing style. Direct/
  clinical queries retrieved correctly ~90%+ of the time; natural, indirect 
  symptom descriptions dropped to ~45%. This gap matters specifically for a 
  first-aid tool, since real users in an emergency are unlikely to use 
  textbook terminology.
- **Tested hybrid (semantic + TF-IDF) retrieval** as a potential fix. Across 
  multiple threshold and weight configurations, hybrid re-ranking showed no 
  measurable improvement — the confidence gate and hybrid's usefulness turned 
  out to be largely mutually exclusive on this dataset (queries confident 
  enough to pass were already ranked correctly; queries hybrid could rescue 
  were exactly the ones the safety threshold correctly filtered out). Kept 
  semantic-only retrieval in production for simplicity; hybrid implementation 
  retained in `lib/hybridSearch.js` and `lib/tfidf.js` as a tested, documented, 
  not-adopted approach.
- **Next step**: query rewriting/expansion (e.g., an LLM pass that reformulates 
  casual symptom descriptions into clinical terms before embedding) is the 
  most promising direction to close the natural-phrasing gap.

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- Free accounts on: [Groq](https://console.groq.com), [Pinecone](https://pinecone.io), [Cohere](https://dashboard.cohere.com)

### Installation

```bash
git clone https://github.com/yashikabhalla/firstaid-rag
cd firstaid-rag
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=firstaid-rag
COHERE_API_KEY=your_cohere_api_key
```

### Set Up Pinecone Index

Go to [Pinecone](https://app.pinecone.io) and create an index:
- Name: `firstaid-rag`
- Dimensions: `1024`
- Metric: `cosine`
- Serverless: AWS us-east-1

### Upload Medical Data to Pinecone

```bash
node scripts/uploadData.mjs
```

This runs once — converts all 84 entries to embeddings and uploads to Pinecone.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```text
firstaid-rag/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js        ← RAG pipeline (embed → search → generate)
│   ├── components/
│   │   ├── ChatMessage.js      ← message bubbles with source cards
|   |   ├── CrisisBanner.js
│   │   ├── EmergencyBanner.js  ← red 911 alert banner
│   │   ├── LoadingDots.js      ← typing indicator
|   |   ├── LowConfidenceBanner.js
│   │   └── SourceCard.js       ← clickable citation cards
│   ├── page.js                 ← main chat interface
│   ├── layout.js               ← HTML wrapper
│   └── globals.css             ← global styles
├── data/
│   └── firstaid.js             ← 84 medical entries knowledge base
├── lib/
│   ├── embeddings.js           ← Cohere embedding function
│   ├── hybridSearch.js         ← hybrid semantic+keyword retrieval(evaluated, not in production)
│   ├── safety.js               ← crisis-query detection + fixed crisis response
│   └── tfidf.js                ← TF-IDF index for hybrid search
│   └── pinecone.js             ← Pinecone connection helper
├── scripts/
│   └── uploadData.mjs          ← one-time data upload script
│   └── evalRetrieval.mjs       ← retrieval accuracy evaluation harnes
└── .env.local                  ← API keys (never committed)
```
---

## 🔑 Key Technical Decisions

**Why RAG over fine-tuning?**
Fine-tuning is expensive and the model still can't cite sources. RAG is cheaper, updatable, and every answer is traceable to a source.

**Why Cohere for embeddings?**
Cohere's `embed-english-v3.0` produces high-quality 1024-dimension semantic vectors. Unlike keyword search, it understands that "loosemotion" means diarrhea, "cardiac arrest" means CPR needed, etc.

**Why Groq?**
Groq provides fast inference for open-source LLMs, making it suitable for low-latency response generation in this application.

**Why Pinecone?**
Purpose-built vector database with cosine similarity search. A regular SQL database can't do semantic similarity search across 1024-dimension vectors efficiently.

**Why a confidence threshold instead of always answering?**
Early testing showed the app would generate answers even from weak (~20-50%) 
retrieval matches — risky for medical content. Adding a 0.55 threshold, tuned 
against the eval set, means the app only answers when retrieval is genuinely 
confident.

**Why bypass the RAG pipeline for crisis queries instead of letting the LLM handle them?**
The knowledge base includes a mental health category, so a suicide-related query 
could otherwise retrieve and generate from that content — an LLM improvising in 
exactly the situation where a fixed, vetted response is safer. Crisis queries are 
detected via pattern matching and routed to a static response before any embedding 
or generation happens.

**Temperature 0.3?**
Low temperature means more factual and consistent responses. Medical guidance should be reliable, not creative.

---

## 💡 What I Learned Building This

- How RAG architecture works end to end — embedding, retrieval, augmentation, generation
- The difference between keyword search and semantic vector search
- How vector databases store and query high-dimensional data using cosine similarity
- Why embedding model choice matters (hash-based vs semantic embeddings)
- Next.js 14 App Router, API routes, and server-side rendering
- Managing API keys, environment variables, and production deployment
- How to build and run a labeled evaluation harness to measure retrieval accuracy honestly, rather than assume RAG "just works"
- That a tested improvement (hybrid search) can validly show no measurable benefit — and that documenting a negative result is more valuable than forcing a positive one

---

## ⚠️ Disclaimer

This application provides first aid **guidance only** based on publicly available medical information. It is not a substitute for professional medical advice, diagnosis, or treatment. **Always call 911 for medical emergencies.**
For mental health crises, this app directs users to dedicated crisis resources rather than 
attempting to provide guidance itself.

---

## 👩‍💻 Built By

**Yashika Bhalla** — 4th year Computer Engineering student  

---

*Sources: American Red Cross · Mayo Clinic · NHS · CDC*