export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }

  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  try {
    const googleResponse = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!googleResponse.ok) {
      const errorData = await googleResponse.json().catch(() => ({}));
      return res.status(googleResponse.status).json(errorData);
    }

    const data = await googleResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Vercel API error:", error);
    return res.status(500).json({ error: 'Internal server error during Gemini API call' });
  }
}
