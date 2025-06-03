// db.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tanvi023:Re8_MVTrSQxH@real-time-code-editor-d.ty9przt.mongodb.net/?retryWrites=true&w=majority&appName=Real-time-code-editor-data"; 
console.log("Mongo URI: ", MONGO_URI);
// ✅ Create a single connection
const connection = mongoose.createConnection(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Use the correct database
const db = connection.useDb("Chat-app");

// ✅ Import schemas
const userSchema = require('../models/userModel');
const chatSchema = require('../models/chatModel');
const messageSchema = require('../models/messageModel');

// ✅ Register models on this DB instance
const User = db.model("User", userSchema);
const Chat = db.model("Chat", chatSchema);
const Message = db.model("Message", messageSchema);

module.exports = { db, User, Chat, Message };
