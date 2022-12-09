const mongoose = require("mongoose"); //import mongoose

// evento schema
const User_EventSchema = new mongoose.Schema({
    username: {type: String, required: true},
    id_evento: {type: Number, required: true},
});


const User_Event = mongoose.model('user_event', User_EventSchema); //convert to model named evento
module.exports = User_Event; //export for controller use