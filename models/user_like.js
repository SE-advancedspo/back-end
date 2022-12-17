const mongoose = require("mongoose"); //import mongoose

// evento schema
const User_LikeSchema = new mongoose.Schema({
    username: {type: String, required: true},
    id_spot: {type: String, required: true},
});

const User_Like = mongoose.model('user_like', User_LikeSchema); //convert to model named evento
module.exports = User_Like; //export for controller use
