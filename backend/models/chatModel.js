// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require('mongoose');

const chatModel = new mongoose.Schema(
    {
        chatName: {type: String, trim: true},
        isGroupChat: {type: Boolean, default: false},
        users: [
            {type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }, 
    {
        timestamps: true,
    }
);
// const db = mongoose.connection.useDb("Chat-app");
// const Chat = mongoose.model("Chat", chatModel);

module.exports = chatModel;