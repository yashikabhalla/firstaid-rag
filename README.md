# FirstAid RAG Assistant

A full-stack AI-powered first aid chatbot that answers medical questions using **Retrieval-Augmented Generation (RAG)** — retrieving real data from verified medical sources before generating answers, eliminating hallucinations.

🔗 **Live Demo:** https://firstaid-rag-ten.vercel.app

---

## What Makes This Different From a Regular Chatbot

Most AI chatbots generate answers purely from training data and can hallucinate medical information. This app:

1. Converts your question to a semantic embedding using Cohere
2. Searches a vector database (Pinecone) of 80+ verified medical entries
3. Retrieves the most relevant first aid protocols
4. Sends the retrieved context + your question to Groq (Llama 3.3 70B)
5. Returns a sourced, accurate answer with citations

If a topic isn't in the database, it honestly says so instead of making something up.

---

## Features

- **RAG Architecture** — retrieves before generating, not a ChatGPT wrapper
- **Source Citations** — every answer shows which medical organization it came from
- **Emergency Detection** — detects life-threatening queries and triggers 911 alert
- **80+ Medical Topics** across 16 categories from Red Cross, Mayo Clinic, NHS, CDC
- **Semantic Search** — understands meaning, not just keywords
- **$0 Cost** — entire stack runs on free tiers

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS |
| AI Model | Groq (Llama 3.3 70B) |
| Embeddings | Cohere embed-english-v3.0 |
| Vector DB | Pinecone |
| Deployment | Vercel |

---

## Medical Categories Covered

Bleeding & Wounds · Burns · Choking & Breathing · Cardiac & CPR · Bone & Muscle · Head Injuries · Temperature Emergencies · Poisoning & Overdose · Bites & Stings · Diabetic & Seizure · Mental Health Crisis · Common Illnesses · Pediatric Emergencies · Dental · Pregnancy · Workplace & Sports

---

## Local Setup

```bash
git clone https://github.com/yashikabhalla/firstaid-rag
cd firstaid-rag
npm install
```

Create `.env.local`:
```
GROQ_API_KEY=your_key
PINECONE_API_KEY=your_key
PINECONE_INDEX=firstaid-rag
COHERE_API_KEY=your_key
```

```bash
npm run dev
```

---

## Architecture
User Question
↓
Cohere Embeddings (semantic vector)
↓
Pinecone Vector Search (top 3 matches)
↓
Retrieved Medical Context
↓
Groq LLM (Llama 3.3 70B)
↓
Sourced Answer + Citations
---

*This is a first aid guidance tool only. Always call 911 for medical emergencies.*