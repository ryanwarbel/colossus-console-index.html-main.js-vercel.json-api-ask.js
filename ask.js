export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = await req.json()

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  const answer = data.choices?.[0]?.message?.content || 'No answer found.'

  res.status(200).json({ answer })
}
