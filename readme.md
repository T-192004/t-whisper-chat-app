# 💬 T-Whispers – Real-Time Chat Application

T-Whispers is a fully-functional **real-time chat app** with support for **user authentication**, **1-on-1 and group messaging**, **profile management**, and **real-time notifications** using **Socket.IO**. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and deployed with **Render** and **Netlify**.

---

## 📦 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React.js, Chakra UI, Axios          |
| Backend   | Node.js, Express.js, MongoDB        |
| Real-time | Socket.IO                           |
| Auth      | JWT, bcrypt                         |
| File Upload | Cloudinary                        |
| Deployment | Netlify (frontend) + Render (backend) |

---

## 🔐 Features

- 🔑 Secure login & signup using JWT
- 🧾 Group & private chats
- 📩 Real-time messaging with Socket.IO
- 📝 Typing indicators
- 👥 Add/remove users in group chats (admin-only)
- 📸 Profile picture upload via Cloudinary
- 🔔 In-app chat notifications
- 🧠 Smart scroll, chat bubble UI, and responsive design

---

## 📁 Project Structure

    📦 t-whispers-chat-app
    ├── client/ # React frontend (Netlify deployed)
    │ ├── Pages/
    │ ├── components/
    │ ├── Context/
    │ └── ...
    ├── server/ # Node.js backend (Render deployed)
    │ ├── controllers/
    │ ├── routes/
    │ ├── models/
    │ ├── middleware/
    │ ├── config/
    │ └── server.js
    ├── .env # Shared config keys (ignored in Git)



---

## ⚙️ Environment Setup

### `.env` for Backend (`server/.env`)

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key


### .env for Frontend (client/.env)

    REACT_APP_BACKEND_URL=https://your-backend-app.onrender.com


## 🚀 Local Development Setup

### 1. Clone the repository
    git clone https://github.com/T-192004/t-whisper-chat-app
    cd t-whispers-chat-app

### 2. Install server dependencies 

    cd server
    npm install

### 3. Install client dependencies
    cd frontend
    npm install

### 4. Run both servers (in separate terminals)

    # Server
    npm start

    # Client
    cd frontend
    npm start


## 🚢 Deployment Guide

### 🟦 Deploy Backend on Render
1. Go to Render.com and sign in

2. Click **"New Web Service"**

3. Connect your GitHub repo and select the backend folder (server)

4. Set the environment variables:

    - MONGO_URI

    - JWT_SECRET

    - PORT (usually 5000)

5. Use npm install as build command and npm start as start command

6. Once deployed, copy your Render backend URL (e.g. https://chat-backend.onrender.com) and use it in frontend .env



### 🟩 Deploy Frontend on Netlify
1. Go to Netlify.com and sign in

2. Click "Add new site" → "Import from Git"

3. Select the frontend folder (client) in your GitHub repo

4. Set environment variable:

    - REACT_APP_BACKEND_URL=https://your-backend-app.onrender.com

5. Use npm run build as build command

6. Set publish directory to build

7. Click "Deploy site"

## 🌐 Live Demo 
    🌍 Frontend: https://t-whisper-chat-app.netlify.app/
    🌐 Backend API: https://t-whisper-chat-app.onrender.com


## 📸 Screenshots
<details> <summary>🟢 Login & Signup</summary> - Email/password authentication - Guest login button </details> <details> <summary>🟣 Chat Dashboard</summary> - Side drawer with search - Realtime updates & typing indicator </details> <details> <summary>🟡 Group Management</summary> - Admin can add/remove users - Rename group, leave room </details>


## 🧪 Test Credentials
You can use the following for demo access:

    Email: guest@example.com
    Password: 123456

## 👩‍💻 Author
Tanvi Tomar
🎓 B.Tech IoT | 💼 Data Science Intern | 🌐 Full Stack Developer
🔗 LinkedIn
🔗 GitHub

## 📜 License
This project is licensed under the MIT License.

