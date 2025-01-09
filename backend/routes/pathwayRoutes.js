

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const GOOGLE_GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; 
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

router.post("/generate", async (req, res) => {
    const { technology } = req.body;

    try {
        console.log("Received technology:", technology);

        const prompt = `Generate a short and concise learning pathway for mastering ${technology}. Each stage should have a title, a brief description (1-2 sentences), and 1-2 key resources or topics. Limit each stage to no more than 3 bullet points. Ensure that the descriptions are compact, clear, and not overly detailed. Each stage should be visually distinct and easy to read. also don't provide the bold words in any of your response basically i have to generate a pathway graph to learn about mentioned technology so provide in that way`;

        const payload = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        console.log("Payload:", payload);

        const response = await axios.post(`${GOOGLE_GEMINI_API_URL}?key=${API_KEY}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("API Response:", response.data);

        const generatedPathway = response.data.candidates[0].content.parts[0].text;

        // Split the string into smaller, concise steps
        const pathwayArray = generatedPathway.split('\n').map(step => step.trim()).filter(step => step !== "");

        // Send the simplified pathway array to the frontend
        res.json({ pathway: pathwayArray });
    } catch (error) {
        console.error("Error generating pathway:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate pathway" });
    }
});

module.exports = router;
