import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat';

const ChatBox = ({ setFetchAgain, fetchAgain }) => {
  // Access the currently selected chat from the global chat context
  const { selectedChat } = ChatState();

  return (
    <Box
      // Display flex if a chat is selected on base (mobile) screens, else hide
      // Always display flex on medium (md) and larger screens
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      
      // Align children vertically centered
      alignItems="center"
      
      // Arrange children in a column (vertical) direction
      flexDir="column"
      
      // Padding inside the box
      p={3}
      
      // White background color
      bg="white"
      
      // Full width on small screens, 68% width on md and larger screens
      w={{ base: "100%", md: "68%" }}
      
      // Rounded corners
      borderRadius="lg"
      
      // Border width of 1 pixel
      borderWidth="1px"
    >
      {/* Render the SingleChat component which shows the messages and chat UI */}
      {/* Pass down fetchAgain state and its setter to trigger data refetch */}
      <SingleChat setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
    </Box>
  )
}

export default ChatBox
