import { Pinecone } from '@pinecone-database/pinecone'
import { createRequire } from 'module'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const require = createRequire(import.meta.url)
const firstAidData = require('../data/firstaid.js')

async function createEmbedding(text) {
  const response = await fetch('https://api.cohere.com/v1/embed', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      texts: [text],
      model: 'embed-english-v3.0',
      input_type: 'search_document'
    })
  })

  const data = await response.json()

  if (!data.embeddings || !data.embeddings[0]) {
    throw new Error('Embedding failed: ' + JSON.stringify(data).slice(0, 200))
  }

  return data.embeddings[0]
}

async function uploadData() {
  console.log('Connecting to Pinecone...')
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
  const index = pc.index(process.env.PINECONE_INDEX)

  console.log(`Uploading ${firstAidData.length} entries...`)

  for (const item of firstAidData) {
    const textToEmbed = `${item.topic} ${item.keywords.join(' ')} ${item.content}`
    const embedding = await createEmbedding(textToEmbed)

    await index.upsert({ records: [{
      id: String(item.id),
      values: embedding,
      metadata: {
        topic: String(item.topic ?? ''),
        source: String(item.source ?? ''),
        sourceUrl: String(item.sourceUrl ?? ''),
        content: String(item.content ?? '').slice(0, 1000),
        keywords: String(item.keywords?.join(', ') ?? '')
      }
    }]})

    console.log(`✓ Uploaded: ${item.topic}`)
  }

  console.log('\n✅ All data uploaded to Pinecone successfully!')
}

uploadData().catch(console.error)