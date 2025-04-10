import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/slack', async (req, res) => {
  try {
    const { webhookUrl, message } = req.body;
    const formattedMessage = `From Nadia Tiwing's Slack Bot: ${message}`;
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: formattedMessage }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});

export default app;