import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import { useState } from 'react';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  // Chakra UI hook to manage modal open/close state
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Local state to manage group chat name input field
  const [groupChatName, setGroupChatName] = useState();

  // Local state for search input query
  const [search, setSearch] = useState();

  // State to store search results from API
  const [searchResult, setSearchResult] = useState();

  // Loading state for async operations (adding/removing users, searching)
  const [loading, setLoading] = useState(false);

  // Separate loading state for renaming the group chat
  const [renameLoading, setRenameLoading] = useState(false);

  // Accessing chat context: selected chat, setter function, current user
  const { selectedChat, setSelectedChat, user } = ChatState();

  // Chakra UI toast for showing notifications
  const toast = useToast();

  // Function to remove a user from the group chat
  const handleRemove = async (user1) => {
    // Only allow group admin to remove users
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can remove someone",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      // API call to remove user from group
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/chat/groupremove`, {
        chatId: selectedChat._id,
        userId: user1._id
      }, config);

      // If the user removed is the current user, deselect chat, else update chat data
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);

      // Trigger fetchAgain to refresh parent component
      setFetchAgain(!fetchAgain);

      // Refresh messages after removing user
      fetchMessages();

      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
  };

  // Function to rename the group chat
  const handleRename = async () => {
    // Do nothing if group chat name is empty
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      // API call to rename the group chat
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/chat/rename`, {
        chatId: selectedChat._id,
        chatName: groupChatName
      }, config);

      // Update selected chat with new name
      setSelectedChat(data);

      // Refresh parent component
      setFetchAgain(!fetchAgain);

      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }

    // Clear input field after renaming
    setGroupChatName("");
  };

  // Function to search users for adding to group
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      // API call to search users by query
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allUsers?search=${query}`, config);

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

  // Function to add a user to the group chat
  const handleAddUser = async (user1) => {
    // If user already exists in group, show error
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User already in group!",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    // Only group admin can add users
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can add someone",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      // API call to add user to group
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/chat/groupAdd`, {
        chatId: selectedChat._id,
        userId: user1._id
      }, config);

      // Update selected chat with new group users
      setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
  };

  return (
    <>
      {/* Icon button to open modal */}
      <IconButton
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
        aria-label="Open Group Chat Settings"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* Modal Header showing current group chat name */}
          <ModalHeader
            fontSize="35px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box>
              {/* Show all current group users with badges */}
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)} // Remove user on badge click
                />
              ))}
            </Box>

            {/* Input and button to rename group chat */}
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            {/* Input to search for users to add */}
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {/* Loading spinner or search results */}
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)} // Add user on click
                />
              ))
            )}
          </ModalBody>

          {/* Footer button to leave the group */}
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              isCentered
              onClick={() => handleRemove(user)} // User leaves group
            >
              Leave Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
