const mongoose = require("mongoose")

const SamplesSchema = new mongoose.Schema(
    {
        rank: Number,
        name:String,
        year:Number,
        rating :Number,
        genre:String,
        certificate:String,
        run_time:String,
        tagline:String,
        budget:Number,
        box_office:Number,
        casts:String,
        directors:String,
        writers:String
    }
)

const Samples = mongoose.model("Samples", SamplesSchema)

module.exports = Samples