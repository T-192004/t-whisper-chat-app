// React Router hook to navigate programmatically
import { useNavigate } from 'react-router-dom';

// React hook for side effects
import { useEffect } from 'react';

// Authentication components
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';

// Chakra UI components for layout and styling
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (based on local storage)
    const user = JSON.parse(localStorage.getItem("userInfoChatApp"));

    // If user exists, redirect to the chat page
    if (user) navigate('/chats');
  }, [navigate]);

  return (
    // Centered container with max width
    <Container maxW='xl' centerContent>
      
      {/* Header box */}
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg={'white'}
        w='100%'
        textAlign='center'
        m='40px 0px 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        {/* App title */}
        <Text fontSize='4xl' fontFamily='Work Sans' color={'black'}>
          T-Whisper
        </Text>
      </Box>

      {/* Login/Signup Tab container */}
      <Box
        bg={'white'}
        borderRadius='lg'
        borderWidth='1px'
        color={'black'}
        p={4}
        w='100%'
      >
        {/* Tabs for switching between Login and Signup */}
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Signup</Tab>
          </TabList>

          {/* Content for each tab */}
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
