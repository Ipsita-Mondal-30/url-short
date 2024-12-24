const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Ensure this path points to your model file

router.get("/", async (req, res) => {
    try {
        const allurls = await URL.find({});
        return res.render("home", { urls: allurls });
    } catch (error) {
        console.error("Error fetching URLs:", error.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
