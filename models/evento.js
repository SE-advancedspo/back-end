const mongoose = require("mongoose"); //import mongoose

// evento schema
const EventoSchema = new mongoose.Schema({
    id_evento: {type: Number, required: true}, // DC: necessary?
    nome: {type: String, required: true},
    data: {type: Date, required: true},
    luogo: {type: String, required: true}, // must be complete (via + civico + città)
    salvato: Boolean,
});


const Evento = mongoose.model('evento', EventoSchema); //convert to model named evento
module.exports = Evento; //export for controller use