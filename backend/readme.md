# 💬 Real-Time Chat App - Backend

This is the **backend** of a real-time chat application built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**. It powers functionalities like user registration, login, chat creation, messaging, and real-time updates via sockets.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 👥 User Registration & Login
- 💬 One-on-One and Group Chats
- 📩 Real-Time Messaging with Socket.IO
- 🛠 Chat Rename, Add/Remove Users in Group
- 🗃️ MongoDB Schemas for Users, Chats, Messages
- 🔄 REST APIs with Proper Error Handling

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Real-Time**: Socket.IO
- **Auth**: JWT, bcrypt
- **Middleware**: express-async-handler, CORS, dotenv

---

## 🗂️ Folder Structure

    ├── config/
    │ ├── db.js # MongoDB Connection + Models Setup
    │ ├── generateToken.js # JWT Token Generator
    │
    ├── controllers/
    │ ├── userControllers.js # User Auth and Search
    │ ├── chatControllers.js # Chat Access, Group Management
    │ ├── sendMessage.js # Message Handling
    │
    ├── middleware/
    │ ├── authMiddleware.js # Protect Routes using JWT
    │ ├── errorMiddleware.js # Error Handling
    │
    ├── models/
    │ ├── userModel.js # User Schema
    │ ├── chatModel.js # Chat Schema
    │ ├── messageModel.js # Message Schema
    │
    ├── routes/
    │ ├── userRoutes.js
    │ ├── chatRoutes.js
    │ ├── messageRoutes.js
    │
    ├── server.js # Main Application Entry Point





---

## 🧾 API Endpoints

### 👤 User Routes (`/api/user`)

- `POST /api/user/` – Register a new user
- `POST /api/user/login` – Login user and return token
- `GET /api/user?search=` – Search users by name or email (protected)

### 💬 Chat Routes (`/api/chat`)

- `POST /api/chat/` – Access or create a one-on-one chat
- `GET /api/chat/` – Fetch all chats for the logged-in user
- `POST /api/chat/group` – Create a new group chat
- `PUT /api/chat/rename` – Rename a group chat
- `PUT /api/chat/groupadd` – Add user to a group
- `PUT /api/chat/groupremove` – Remove user from a group

### ✉️ Message Routes (`/api/message`)

- `POST /api/message/` – Send a message to a chat
- `GET /api/message/:chatId` – Fetch all messages for a chat

---

## 🔐 Authentication
- Token is generated using `jsonwebtoken`:
    ```js
    const jwt = require('jsonwebtoken');

    const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    };

    module.exports = generateToken;
All protected routes require a Bearer <token> in the Authorization header.

## ⚙️ MongoDB Configuration
Defined in config/db.js. It:

- Connects to MongoDB Atlas

- Selects the Chat-app database

- Registers User, Chat, and Message models

## 📦 Installation & Running Locally

### 1. Clone the repository - 
    git clone https://github.com/T-192004/t-whisper-chat-app

### 2. Install dependencies - 
    npm install

### 3. Set up environment variables - 
Create a .env file:
    PORT=5000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_secret_key

### 4. Start the server - 
    npm start

Server runs on: http://localhost:5000



## 🔌 Socket.IO Events
| Event Name    | Purpose                        |
| ------------- | ------------------------------ |
| `set-up`      | Initializes a user socket room |
| `join-chat`   | Joins a specific chat room     |
| `typing`      | Notify typing status           |
| `stop-typing` | Notify stop typing             |
| `new-message` | Broadcasts new message         |


## 📄 License
This project is licensed under the MIT License.


## ✨ Author
Tanvi Tomar – B.Tech IoT | Data Science Intern | Full Stack Developer

