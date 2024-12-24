const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path= require('path')
const urlRoute = require("./routes/url");
const { connecttoMongodb } = require("./connect");
const Url = require("./models/url"); 
const staticroute=require("./routes/staticrouter")
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");
app.set("views", path.resolve("./views"))
app.use("/",staticroute)

app.get("/test",async (req,res)=>{
    const allurls=await Url.find({});
    return res.render("home",{
        urls:allurls,
    });

    
});

app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;

    try {
        const entry = await Url.findOneAndUpdate(
            { shortID },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } 
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error finding URL:", error);
        res.status(500).send("Server Error");
    }
});

connecttoMongodb("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server is running on port", PORT));
