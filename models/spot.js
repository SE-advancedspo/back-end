const mongoose = require("mongoose"); //import mongoose

// spot schema
const SpotSchema = new mongoose.Schema({
    id_spot: {type: Number, required: true}, // DC: necessary?
    testo: {type: String, required: true},
    autore: {type: String, required: true}, // DC: type: user?
    num_voti: {type: Number, default: 0, min: 0},
    altezza: Number, 
    regione: String,
    colore_capelli: String,
    barba: Boolean,
    facolta: String,
    lang: String, // DC: it should be enum
});

const Spot = mongoose.model('spot', SpotSchema); //convert to model named spot
module.exports = Spot; //export for controller use