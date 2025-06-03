import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a new context for chat-related data
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // State to store the currently logged-in user
  const [user, setUser] = useState();

  // State for the chat currently selected by the user
  const [selectedChat, setSelectedChat] = useState();

  // State to store all chats of the user (array of chat objects)
  const [chats, setChats] = useState([]);

  // React Router's navigation hook for redirecting
  const navigate = useNavigate();

  // State to store notifications (e.g., new messages alerts)
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    // Get user info from localStorage on initial load
    const userInfo = JSON.parse(localStorage.getItem("userInfoChatApp"));
    setUser(userInfo);

    // If no user info found, redirect to home/login page
    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);

  // Provide all state and setters via context to children components
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for accessing the chat context easily
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
