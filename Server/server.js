const express = require("express");
const app = express()
const mongoose = require("mongoose")
const Movies = require("./model")
const cors = require("cors")
app.use(cors({
    origin: '*'
}));
mongoose.connect(
    'mongodb+srv://user:SS47wrtAGKC8BIG9@movies.gjupiog.mongodb.net/test', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () { console.log("Connected successfully"); });

app.get("/list", async(req,res)=>{
    try{
        const list = await Movies.find();
        console.log(list)
        return res.json({
            success:true,
            items:list
        })
    } catch(err){
        console.log(err.message)
    }
})

app.listen(3001, ()=>{console.log('started server')})