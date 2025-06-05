import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogic';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './style.css';
import { ThreeDots } from 'react-loader-spinner';
import ScrollableChat from './ScrollableChat';
// import socket from './socket';  // Not used here, socket.io-client is used instead
import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;  // Backend server URL
var socket, selectedChatCompare;  // Socket instance and chat reference for comparison

const SingleChat = ({ setFetchAgain, fetchAgain }) => {

    // State variables
    const [messages, setMessages] = useState([]);  // Stores all messages in the current chat
    const [loading, seTLoading] = useState(false);  // Loading state for fetching messages
    const [newMessage, setNewMessage] = useState();  // Input message typed by user

    const [socketConnected, setSocketConnected] = useState();  // Whether socket connection is established

    const [typing, setTyping] = useState(false);  // Whether current user is typing
    const [isTyping, setIsTyping] = useState(false);  // Whether the other user is typing

    // Context values from ChatState provider
    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const toast = useToast();  // For showing toast notifications

    // Function to send message when user presses Enter key
    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            socket.emit('stop-typing', selectedChat._id);  // Emit stop typing event

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                };
                setNewMessage("");  // Clear input box
                
                // Post message to backend API
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                setMessages([...messages, data]);  // Add new message to current messages state
                
                socket.emit("new-message", data);  // Emit socket event to notify other users
            } catch (error) {
                toast({
                    title: "Error Occurred!",
                    description: "Failed to send the message",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-left',
                });
                return;
            }
        }
    };

    // Fetch all messages for the selected chat from backend
    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            };
            seTLoading(true);  // Start loading spinner

            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/message/${selectedChat._id}`, config);
            setMessages(data);  // Store fetched messages
            seTLoading(false);  // Stop loading spinner

            socket.emit('join-chat', selectedChat._id);  // Join socket room for this chat
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to load the chats",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
            return;
        }
    };

    // Setup socket connection and listeners on component mount
    useEffect(() => {
        socket = io(ENDPOINT);  // Connect to socket server
        socket.emit("set-up", user);  // Send user info for socket authentication
        socket.on("connected", () => setSocketConnected(true));  // On successful connection, update state

        // Listen for typing events from other users
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop-typing', () => setIsTyping(false));
    }, []);

    // Listen for incoming messages through socket
    useEffect(() => {
        socket.on('message-recieved', (newMessageRecieved) => {
            // If the message belongs to a different chat than the currently selected one
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // Add notification if not already present
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);  // Trigger refetch outside if needed
                }
            } else {
                // If message belongs to current chat, add it to messages
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    // Fetch messages whenever selectedChat changes
    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;  // Keep track of current selected chat for comparison
    }, [selectedChat]);

    // Handle input typing and emit typing events
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);  // Notify server user started typing
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;

        // After timerLength ms without new typing, emit stop typing event
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop-typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display='flex'
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        {/* Back button for mobile view to close chat */}
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {/* Show the name of the user in the chat */}
                                {getSender(user, selectedChat.users)}
                                {/* Show profile modal for the other user */}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {/* For group chats show group chat name and update modal */}
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
                                />
                            </>
                        )}
                    </Text>

                    <Box
                        display='flex'
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="91%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {/* Show spinner while loading messages */}
                        {loading ? (
                            <Spinner
                                size='xl'
                                w={20}
                                h={20}
                                alignSelf='center'
                                margin='auto'
                            />
                        ) : (
                            <div className='messages'>
                                {/* Scrollable chat component showing all messages */}
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        {/* Message input form */}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {/* Show typing indicator when other user is typing */}
                            {isTyping ? (
                                <div style={{ margin: '1px' }}>
                                    <ThreeDots color="#4ca9f5" radius={3} width={40} />
                                </div>
                            ) : <></>}

                            {/* Message input box */}
                            <Input
                                variant='filled'
                                bg='#eoeoeo'
                                placeholder='Enter a Message...'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                // Placeholder UI when no chat is selected
                <Box display='flex' alignItems='center' justifyContent='center' h='100%'>
                    <Text fontSize='3xl' pb={3} fontFamily='Work Sans'>
                        Click on a user to start Chatting
                    </Text>
                </Box>
            )}
        </>
    );
}

export default SingleChat;
