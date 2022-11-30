const mongoose = require("mongoose"); //import mongoose

// friend schema
const FriendSchema = new mongoose.Schema({
    username: {type: String, required: true},
    friend_username: {type: String, required: true},
});

const Friend = mongoose.model('friend', FriendSchema); //convert to model named friend
module.exports = Friend; //export for controller use