export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, aspect_ratio = '16:9', output_format = 'jpg' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing required field: prompt' });
  }

  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_KEY || process.env.REPLICATE_API_TOKEN;

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'Replicate API token not configured' });
  }

  try {
    // Create prediction using Replicate HTTP API
    const createResponse = await fetch('https://api.replicate.com/v1/models/google/nano-banana/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Prefer': 'wait=60'
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio,
          output_format
        }
      })
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      return res.status(500).json({ error: 'Replicate API error', details: errorData });
    }

    const prediction = await createResponse.json();

    // If using sync mode (Prefer: wait), the output should be ready
    if (prediction.status === 'succeeded' && prediction.output) {
      return res.status(200).json({
        success: true,
        image_url: prediction.output,
        prediction_id: prediction.id
      });
    }

    // If async, poll for result
    let result = prediction;
    let attempts = 0;
    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { 'Authorization': `Bearer ${REPLICATE_API_TOKEN}` }
      });
      result = await pollResponse.json();
      attempts++;
    }

    if (result.status === 'succeeded') {
      return res.status(200).json({
        success: true,
        image_url: result.output,
        prediction_id: result.id
      });
    } else {
      return res.status(500).json({
        error: 'Image generation failed',
        status: result.status,
        details: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
