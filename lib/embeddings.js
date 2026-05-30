export async function createEmbedding(text) {
  const response = await fetch('https://api.cohere.com/v1/embed', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      texts: [text],
      model: 'embed-english-v3.0',
      input_type: 'search_query'
    })
  })

  const data = await response.json()

  if (!data.embeddings || !data.embeddings[0]) {
    throw new Error('Embedding failed: ' + JSON.stringify(data).slice(0, 200))
  }

  return data.embeddings[0]
}