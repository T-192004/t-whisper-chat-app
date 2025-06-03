import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

// Custom context hook to get chat-related state, including user info
import { ChatState } from '../Context/ChatProvider';

// Components for different parts of the chat page
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

export default function ChatPage() {
  // Get the current logged-in user from chat context
  const { user } = ChatState();

  // Local state to trigger re-fetching chats (e.g., after sending a message)
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    // Full width container for the chat page
    <div style={{ width: '100%' }}>
      
      {/* Show side drawer only if user is logged in */}
      {user && <SideDrawer />}

      {/* Main layout: chat list and chat box side by side */}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'  // Set height just below full viewport height
        p='10px'
      >
        {/* Show list of chats only if user is logged in */}
        {user && <MyChats fetchAgain={fetchAgain} />}

        {/* Show active chat box only if user is logged in */}
        {/* Pass down fetchAgain state to trigger updates */}
        {user && (
          <ChatBox
            setFetchAgain={setFetchAgain}
            fetchAgain={fetchAgain}
          />
        )}
      </Box>
    </div>
  );
};
