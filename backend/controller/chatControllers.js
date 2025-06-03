const asyncHandler = require('express-async-handler');
const {User, Chat} = require('../config/db');

const mongoose = require('mongoose');

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Validate ObjectIds
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(req.user._id) || !ObjectId.isValid(userId)) {
    console.log("Invalid ObjectId");
    return res.sendStatus(400);
  }
  const userDetail = await  User.find({_id: userId}).select("-password");
  console.log(userDetail);

  let isChat = await Chat.find({
  isGroupChat: false,
  $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
    ],
    })
    .populate("users", "-password")  // Populate the users, excluding the password
    .populate({
    path: "latestMessage",  // Populate latestMessage
    populate: {
        path: "sender",  // Populate sender inside latestMessage
        select: "name pic email",  // Select only relevant fields for the sender
    },
    });

    console.log(isChat, "Chat details with populated user data");


  if (isChat.length > 0) {
    return res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password")  // Populating users in the new chat
        .populate("latestMessage.sender", "name pic email");  // Populating sender in latestMessage

      console.log("Full chat", FullChat);
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res)=> {
    try {
      Chat.find({users: {$elemMatch: {$eq: req.user._id}} }).populate(
        "users", "-password"
      ).populate("groupAdmin", "-password").populate("latestMessage").sort(
        {updatedAt: -1}
      ).then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
      
    } catch (error) {
      res.status(400);
      throw new Error(`Error: ${error.message}`);
    }
});


const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({message: "Please Fill all the fields"});
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required to create a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({_id: groupChat._id})
    .populate("users", "-password")
    .populate("groupAdmin", "-passwords");

    res.status(200).json(fullGroupChat);

  } catch (error) {
    res.send(400);
    throw new Error(`Error: ${error.message}`);
  }


});

const renameGroup = asyncHandler(async (req, res)=> {
  const {chatId, chatName} = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {new: true,}
  ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.send(400);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(updatedChat);
    }
});

const addToGroup = asyncHandler(async( req, res)=>{
  const {chatId, userId} = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {users: userId},
    },
    {new: true}
  ).populate("users", "-password")
    .populate("groupAdmin", "-password");
  
     if (!added) {
      res.send(400);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(added);
    }
});

const removeFromGroup = asyncHandler(async( req, res)=>{
  const {chatId, userId} = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: {users: userId},
    },
    {new: true}
  ).populate("users", "-password")
    .populate("groupAdmin", "-password");
  
     if (!removed) {
      res.send(400);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(removed);
    }
});
module.exports = {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup};