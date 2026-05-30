# 🏥 FirstAid RAG Assistant

> An AI-powered first aid chatbot that retrieves verified medical information before generating answers — eliminating hallucinations through RAG (Retrieval-Augmented Generation).

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
5. Generating a sourced, accurate answer — not a guess

If a topic isn't in the database, it honestly says so instead of making something up.

---

## ✨ Features

- 🔍 **RAG Architecture** — retrieves real medical data before generating, not a ChatGPT wrapper
- 📋 **Source Citations** — every answer shows which organization it came from with a clickable link
- 🚨 **Emergency Detection** — detects life-threatening queries and shows urgent 911 alert
- 🧠 **Semantic Search** — understands meaning, not just keywords (powered by Cohere embeddings)
- 📚 **80+ Medical Topics** — 84 entries across 16 categories from verified sources
- 💰 **$0 Cost** — entire stack runs on free tiers

---

## 🏗️ RAG Pipeline
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
│  Build Prompt   │  question + retrieved medical protocols
│  (Augmentation) │  injected as context
└────────┬────────┘
│
▼
┌─────────────────┐
│  Groq LLM       │  generates answer using ONLY retrieved content
│  Llama 3.3 70B  │  temperature: 0.3 for factual responses
└────────┬────────┘
│
▼
Answer + Source Citations + Emergency Flag → UI


---
'''

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14, React, Tailwind CSS | Chat UI, routing, styling |
| AI Inference | Groq (Llama 3.3 70B) | Fast, free LLM generation |
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
│   │   ├── EmergencyBanner.js  ← red 911 alert banner
│   │   ├── LoadingDots.js      ← typing indicator
│   │   └── SourceCard.js       ← clickable citation cards
│   ├── page.js                 ← main chat interface
│   ├── layout.js               ← HTML wrapper
│   └── globals.css             ← global styles
├── data/
│   └── firstaid.js             ← 84 medical entries knowledge base
├── lib/
│   ├── embeddings.js           ← Cohere embedding function
│   └── pinecone.js             ← Pinecone connection helper
├── scripts/
│   └── uploadData.mjs          ← one-time data upload script
└── .env.local                  ← API keys (never committed)

---
'''

## 🔑 Key Technical Decisions

**Why RAG over fine-tuning?**
Fine-tuning is expensive and the model still can't cite sources. RAG is cheaper, updatable, and every answer is traceable to a source.

**Why Cohere for embeddings?**
Cohere's `embed-english-v3.0` produces high-quality 1024-dimension semantic vectors. Unlike keyword search, it understands that "loosemotion" means diarrhea, "cardiac arrest" means CPR needed, etc.

**Why Groq instead of OpenAI?**
Groq runs Llama 3.3 70B at ~500 tokens/second for free. OpenAI charges per token and is slower for this use case.

**Why Pinecone?**
Purpose-built vector database with cosine similarity search. A regular SQL database can't do semantic similarity search across 1024-dimension vectors efficiently.

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

---

## ⚠️ Disclaimer

This application provides first aid **guidance only** based on publicly available medical information. It is not a substitute for professional medical advice, diagnosis, or treatment. **Always call 911 for medical emergencies.**

---

## 👩‍💻 Built By

**Yashika Bhalla** — 3rd year Computer Engineering student  

---

*Sources: American Red Cross · Mayo Clinic · NHS · CDC*