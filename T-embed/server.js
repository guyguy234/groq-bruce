const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const apiKey = process.env.GROQ_API_KEY || "API_KEY";

const groq = new Groq({ apiKey: apiKey });

app.post('/chat', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

 
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: userPrompt }],
      model: 'llama-3.3-70b-versatile',
    });

    const replyText = chatCompletion.choices[0]?.message?.content || "No response";
    res.json({ reply: replyText });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

const PORT = process.env.PORT || 13959;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT} with Groq API`);
});
