import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "./miscellaneous/GroupChatModal";


const MyChats = ({ fetchAgain }) => {
  // Local state to store logged in user's info
  const [loggedUser, setLoggedUser] = useState();

  // Destructure global chat-related state and functions from context provider
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  // Chakra UI toast for displaying notifications
  const toast = useToast();

  // Function to fetch chats from backend API
  const fetchChats = async () => {
    try {
      // Set the authorization header with the user token for protected API
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      // Make GET request to fetch all chats of the logged user
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, config);

      // Log data for debugging (can be removed in production)
      console.log(data);

      // Store fetched chats in global context state
      setChats(data);

    } catch (error) {
      // Show error toast if request fails
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      return;
    }
  };

  // useEffect to run on component mount and when fetchAgain changes
  useEffect(() => {
    // Retrieve user info from localStorage and set it to local state
    setLoggedUser(JSON.parse(localStorage.getItem('userInfoChatApp')));

    // Fetch chats from API
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      // Conditionally display based on whether a chat is selected
      display={{ base: selectedChat ? "none" : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: '100%', md: '31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      {/* Header Section: Title and button to create new group chat */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: '30px' }}
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chats list container */}
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          // Display chats in a scrollable stack
          <Stack overflow='scroll'>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}  // Select this chat on click
                cursor="pointer"
                // Highlight the currently selected chat
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>
                  {/* Display chat name or the other user's name if it's not a group chat */}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          // Show loading spinner if chats haven't loaded yet
          <ChatLoading />
        )}
      </Box>

    </Box>
  );
};

export default MyChats;
