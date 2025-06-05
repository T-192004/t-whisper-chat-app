const express = require('express');
const dotenv = require('dotenv');
// const chats = require('./data/data')

const {db} = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const mesaageRoutes = require('./routes/messageRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
dotenv.config();
const app = express();
app.use(cors());

db.once('open', () => {
  console.log('MongoDB connected to Chat-app database');
});
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Api is working successfully");
})

app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', mesaageRoutes);
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on('connection', (socket) => {
  console.log("Connected to socket io");

  socket.on('set-up', (userData) => {
    socket.join(userData._id); // Create a room for the user
    // console.log(userData); // you had `user` which is undefined, corrected to `userData`
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    // console.log("User joined room: " + room);

  });
  
  socket.on('typing', (room)=>socket.in(room).emit("typing"));
  socket.on('stop-typing', (room)=>socket.in(room).emit("stop-typing"));

  socket.on('new-message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if(!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message-recieved", newMessageRecieved);
    });
  });

  socket.off('set-up', () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  } )
});
