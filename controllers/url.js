const shortid = require("shortid");
const URL = require('../models/url'); // Ensure the correct path to your model

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    // Check if URL is provided
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Generate the short URL using shortid
    const shortURL = shortid.generate();

    try {
        // Create a new URL document
        await URL.create({
            shortId: shortURL,         // Correct field name for shortened URL
            redirectURl: body.url,     // Correct field name for redirected URL (matches schema)
            visitHistory: []           // Initialize visitHistory as an empty array
        });

        // Return the short URL
        return res.status(201).json({ shortURL });
    } catch (error) {
        console.error("Error saving URL:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
handleGenerateNewShortURL};