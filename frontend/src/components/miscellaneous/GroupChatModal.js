import { Button, Box, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();


  const {user, chats, setChats} = ChatState();
  
  const handleSearch = async (query) => {
    setSearch(query);
    if(!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    };
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allUsers?search=${query}`, config);
    console.log("Search data: ", data);
    setSearchResult(data);
    setLoading(false);
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
  };

  

  const handleSubmit  = async() => {

    if(!groupChatName || !selectedUsers) {
      toast({
          title: "Please Fill all the field!",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
      });
            return;
    }

    try {
      const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    };
    const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat/group`, {
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map(u => u._id)),
    }, config);

    setChats([data, ...chats]);
    onClose();
    toast({
      title: "Your Group is created!",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
    } catch (error) {
      toast({
            title: "Error Occured!",
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
        return;
    }

  };

  const handleGroup = (userToAdd) => {
    if(selectedUsers.includes(userToAdd)) {
        toast({
          title: "User already added!",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };


  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
  };


  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader 
                  fontSize='35px'
                  fontFamily='Work Sans'
                  display='flex'
                  justifyContent='center'
                 >
                  Create Group Chat
              </ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' flexDir='column' alignItems='center'  >
                  <FormControl>
                    <Input placeholder='Chat Name' mb={3} onChange={e => setGroupChatName(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <Input placeholder="Add Users eg: John, Piyush, Jane" mb={1} onChange={e => handleSearch(e.target.value)} />
                  </FormControl>
                  
                 <Box w='100%' display='flex' flexWrap='wrap' >
                   {selectedUsers.map(u => (
                    <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                  ))}

                 </Box>
                  {loading? <Spinner /> : (
                    searchResults?.slice(0,4).map(user => (
                      <UserListItem key={user._id} user={user} handleFunction={()=> handleGroup(user)}  />
                    ))
                  )}
                </ModalBody>
      
                <ModalFooter>
                  <Button  colorScheme='blue' onClick={handleSubmit}>
                    Create Chat
                  </Button>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  )
}

export default GroupChatModal