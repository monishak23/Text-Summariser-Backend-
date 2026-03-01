require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/summarise', async (req,res) => {
    const { text } = req.body;

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    try {
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize this: ${text}`
        });
        const summary = result.text;

        res.json({ summary: summary });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ error: "AI failed to respond" });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

