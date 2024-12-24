const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortURL = shortid.generate();

    try {
       
        await URL.create({
            shortId: shortURL,         
            redirectURL: body.url,      
            visitHistory: []         
        });

  
        const urls = await URL.find();

        
        return res.render("home", {
            id: shortURL,
            urls: urls
        });
    } catch (error) {
        console.error("Error saving URL:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleGenerateNewShortURL
};
