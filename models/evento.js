const mongoose = require("mongoose"); //import mongoose

// evento schema
const EventoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    data: {type: Date, required: true},
    luogo: {type: String, required: true},
});


const Evento = mongoose.model('evento', EventoSchema); //convert to model named evento
module.exports = Evento; //export for controller use