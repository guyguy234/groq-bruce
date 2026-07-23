const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/chat', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) return res.status(400).json({ error: 'Prompt required' });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant on a tiny micro-controller screen. ALWAYS reply in short, concise sentences (maximum 25-30 words total).' 
        },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    res.json({ reply: chatCompletion.choices[0]?.message?.content || "No response" });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(13959, '0.0.0.0', () => console.log('Server running on port 13959'));