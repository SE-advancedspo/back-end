const mongoose = require("mongoose"); //import mongoose

// user schema
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    contatto: {type: String, required: true},
    foto: String,
    bio: String,
    facolta: String,
    anno_acc: String, // DC: why String? + to remove
    regione: String,
    desc: String,  // DC: what is it?
    // DC: altezza is missing
    // DC: colore_capelli is missing
    // DC: barba is missing

    status: Boolean,
});


const User = mongoose.model('user', UserSchema); //convert to model named user
module.exports = User; //export for controller use