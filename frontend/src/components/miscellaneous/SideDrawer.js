import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogic';



function SideDrawer() {
  const {user, setSelectedChat, chats, setChats, notification, setNotification} =  ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
 const [search, setSearch] = useState("");
 const [searchResult, setSearchResult] = useState([]);
 const [loading, setLoading] = useState(false);
 const [loadingChat, setLoadingChat] = useState();
 const toast = useToast();
const navigate = useNavigate();
 const logOutHandler = () => {
  localStorage.removeItem('userInfoChatApp')
  navigate('/');
 }

 const handleSearch = async () => {
  if (!search) {
    toast({
        title: "Please Enter something in search!",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
    });
    return;
  }

  try {
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      },

    };
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allUsers?search=${search}`, config);
    // console.log(data);
    
    setLoading(false);
    setSearchResult(data);

  } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
    });
    return;
  }
 }

 const accessChat = async (userId) => {
  try {
    setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
    };

    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {userId}, config);
    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    onClose();

  } catch (error) {
    toast({
        title: "Error Occured!",
        description: "Failed to fetch the Chat",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
    });
    return;
  }
 };

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
      <Tooltip 
        label='Search Users to Chats' 
        hasArrow 
        placement='bottom'
      >
      <Button variant='ghost' onClick={onOpen}>
        <FaSearch /> 
        <Text
          display={{base: 'none', md:'flex'}}
          px='4'
        >
          Search User
        </Text>
      </Button>
      
      </Tooltip>
      <Text fontSize='2xl' fontFamily='Work Sans' color={'black'}>T-Whispers</Text>
      <div>
        <Menu>
          <MenuButton p={1}>
          <Box position="relative">
      <BellIcon fontSize="2xl" m={1} />
      {notification.length > 0 && (
        <Box
          position="absolute"
          top="-1"
          right="-1"
          background="red.500"
          borderRadius="full"
          width="18px"
          height="18px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="10px"
          fontWeight="bold"
          zIndex="1"
        >
          {notification.length}
        </Box>
      )}
    </Box>
            {/* <BellIcon fontSize='2xl' m={1} /> */}
          </MenuButton>
          <MenuList p={3}>
            {!notification.length && "No New Messages"}
            {notification.map(notify => (
                <MenuItem key={notify._id} onClick={() => {
                  setSelectedChat(notify.chat);
                  setNotification(notification.filter(n => n!==notify));
                }}>
                  {notify.chat.isGroupChat? 
                    `New Message in ${notify.chat.chatName}` : 
                    `New Message from ${getSender(user, notify.chat.users)}`}
                </MenuItem>
            ))}
          </MenuList>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar 
                size='sm' 
                cursor='pointer' 
                name={user.name} 
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logOutHandler} >Logout</MenuItem>
            </MenuList>
          </Menu>
        </Menu>
      </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
          <DrawerBody>
          <Box display='flex' pb={2}>
            <Input 
              placeholder='Search by name or email'
              mr={2}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button
              onClick={handleSearch}
            >
              Go
            </Button>
          </Box>
          {loading ? (
            <ChatLoading />
          ): (
            searchResult?.map(user => (
              <UserListItem 
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
        )}
        {loadingChat && <Spinner ml='auto' display='flex' />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer