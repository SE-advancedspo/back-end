const mongoose = require("mongoose"); //import mongoose

// spot schema
const SpotSchema = new mongoose.Schema({
    testo: {type: String, required: true},
    autore: {type: String, required: true},
    num_like: {type: Number, default: 0, min: 0},
    desc: String,
    lang: String,
});


const Spot = mongoose.model('spot', SpotSchema); //convert to model named spot
module.exports = Spot; //export for controller use