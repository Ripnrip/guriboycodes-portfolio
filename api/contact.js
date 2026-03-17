export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || 're_Ta6B1ExN_H2Tyi8Vg6JJbam5iXQfgTTqz'}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@guriboycodes.com>',
        to: ['contact@guriboycodes.com', 'gsingh622@yahoo.com'],
        subject: `New Portfolio Message from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br/> ${message}</p>`
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorData = await response.json();
      return res.status(500).json({ error: 'Failed to send', details: errorData });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
