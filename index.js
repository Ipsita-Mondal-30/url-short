const express=require("express");
const app=express();
const urlRoute=require("./routes/url")
const {connecttoMongodb}=require("./connect")
const PORT=8000;

app.use(express.json());

app.get("/:shortID",async(req,res)=>{
    const shortID=req.params.shortID
    const entry=await url.findOneAndUpdate({
        shortID,

    },

    {
        $push:{
            visitHistory:{
            timestamp:Date.now()
        },
    },
    }
    );
    res.redirect(entry.redirectURL);
});
connecttoMongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log('MongoDb connected'))
app.use("/url",urlRoute);
app.listen(PORT,()=>console.log('Server logged in'))