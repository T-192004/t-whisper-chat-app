# 💬 T-Whispers – Real-Time Chat App (Frontend)

**T-Whispers** is a responsive, real-time chat application built using **React.js** and **Chakra UI**, with support for **user authentication**, **1-on-1 and group chats**, **Socket.IO real-time messaging**, and modern UI/UX enhancements. It interacts with a Node.js + MongoDB backend for chat and user data, and uses Socket.IO for real-time message updates.

---

## 🧩 Features

- 🔐 JWT-based user login, signup, and logout
- 👤 Profile picture upload using Cloudinary
- 💬 Create and manage **group chats**
- 🔍 Real-time **search** for users to start a chat
- 🧭 Sidebar with **notifications** and profile access
- ✉️ Real-time messages with typing indicators and scrollable chat
- 🧑‍🤝‍🧑 Add or remove users from group chats (Admin only)
- 📱 Mobile responsive with conditional rendering

---

## 🛠️ Tech Stack

| Category      | Tech                       |
|---------------|----------------------------|
| Frontend      | React.js (with Hooks)      |
| UI Framework  | Chakra UI                  |
| HTTP Client   | Axios                      |
| Real-time     | Socket.IO Client           |
| State Sharing | React Context API          |
| Forms         | React Hook Form (custom)   |
| Avatar Hosting | Cloudinary                |

---

## 📂 Project Structure

    src/
    │
    ├── App.js # Routing Setup
    ├── App.css # Global Styling
    ├── index.js # Entry Point
    │
    ├── Pages/
    │ ├── HomePage.js # Login/Signup UI
    │ └── ChatPage.js # Main Chat Dashboard
    │
    ├── Context/
    │ └── ChatProvider.js # Global State Provider (user, chats, etc.)
    │
    ├── components/
    │ ├── Authentication/
    │ │ ├── Login.js
    │ │ └── Signup.js
    │ │
    │ ├── misc/
    │ │ ├── SideDrawer.js # Top navigation drawer with search + profile
    │ │ ├── ProfileModal.js # User profile display in modal
    │ │ └── UpdateGroupChatModal.js # Group chat edit modal
    │ │
    │ ├── ChatBox.js # Right pane chat view
    │ ├── MyChats.js # Left pane chat list
    │ ├── SingleChat.js # Chat UI with scroll and socket logic
    │ ├── ScrollableChat.js # Chat bubbles and avatars
    │ ├── GroupChatModal.js # Modal to create new group chat
    │ ├── ChatLoading.js # Skeleton loading state
    │ └── UserAvatar/
    │ ├── UserBadgeItem.js # Badge for users in group chat
    │ └── UserListItem.js # UI for user list during search
    │
    ├── config/
    │ └── ChatLogic.js # Utility functions: getSender, isSameUser etc.
    │
    └── .env # API Endpoint configuration





---

## 🌍 Environment Variables

Create a `.env` file in your root directory:

    REACT_APP_BACKEND_URL=https://your-backend-api.onrender.com


## 🚀 Getting Started
### 1. Clone the Repository

    git clone https://github.com/T-192004/t-whisper-chat-app
    cd t-whispers-chat-frontend

### 2. Install Dependencies - 
    npm install


### 3. Start the Application - 
    npm start

This will launch the app at http://localhost:3000



## 🔐 Authentication Flow

- Registration and Login use /api/user/register and /api/user/login.

- On success, user data and token are stored in localStorage under the key: `userInfoChatApp`

- Protected routes like /chats are only accessible if the token exists.



## 📡 Real-Time Messaging
Socket.IO events handled:

| Event              | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `set-up`           | Authenticate and join user room                        |
| `join-chat`        | Join a specific chat room                              |
| `typing`           | Notify others when a user is typing                    |
| `stop-typing`      | Typing ends                                            |
| `new-message`      | Emit newly sent message                                |
| `message-recieved` | Listen for messages in active chat or as notifications |


## 👨‍👩‍👧‍👦 Group Chat Features

- Create new group chats with multiple users

- Rename group chat title

- Add or remove users (admin-only permission)

- Leave group chat


## 📤 Profile Upload with Cloudinary

- Used in the Signup component

- Supports jpeg and png images

- Uses the fetch API with Cloudinary preset & cloud name


## ✅ Guest Credentials
Click "Get Guest User Credentials" on login page to auto-fill:
    Email: guest@example.com
    Password: 123456


## ✨ Author
Tanvi Tomar
📧 B.Tech | Full Stack | Data Science
🔗 LinkedIn
🔗 GitHub -  https://github.com/T-192004


📝 License
This project is open-source and available under the MIT License.