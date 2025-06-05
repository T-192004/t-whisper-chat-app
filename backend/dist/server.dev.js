"use strict";

var express = require('express');

var dotenv = require('dotenv');

var cors = require("cors"); // const chats = require('./data/data')


var _require = require('./config/db'),
    db = _require.db;

var colors = require('colors');

var userRoutes = require('./routes/userRoutes');

var chatRoutes = require('./routes/chatRoutes');

var mesaageRoutes = require('./routes/messageRoutes');

var _require2 = require('./middleware/errorMiddleware'),
    notFound = _require2.notFound,
    errorHandler = _require2.errorHandler;

dotenv.config();
var app = express();
app.use(cors());
db.once('open', function () {
  console.log('MongoDB connected to Chat-app database');
});
app.use(express.json());
app.get('/', function (req, res) {
  res.send("Api is working successfully");
});
app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', mesaageRoutes);
app.use(notFound);
app.use(errorHandler);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("Server started on PORT ".concat(PORT).yellow.bold));

var io = require('socket.io')(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', function (socket) {
  console.log("Connected to socket io");
  socket.on('set-up', function (userData) {
    socket.join(userData._id); // Create a room for the user
    // console.log(userData); // you had `user` which is undefined, corrected to `userData`

    socket.emit("connected");
  });
  socket.on("join-chat", function (room) {
    socket.join(room); // console.log("User joined room: " + room);
  });
  socket.on('typing', function (room) {
    return socket["in"](room).emit("typing");
  });
  socket.on('stop-typing', function (room) {
    return socket["in"](room).emit("stop-typing");
  });
  socket.on('new-message', function (newMessageRecieved) {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach(function (user) {
      if (user._id == newMessageRecieved.sender._id) return;
      socket["in"](user._id).emit("message-recieved", newMessageRecieved);
    });
  });
  socket.off('set-up', function () {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});