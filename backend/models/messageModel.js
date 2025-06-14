const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, trim: true},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},

},
    {timestamps: true,}
)   
// const db = mongoose.connection.useDb("Chat-app");

// const Message = mongoose.model("Message", messageModel);

module.exports = messageModel;