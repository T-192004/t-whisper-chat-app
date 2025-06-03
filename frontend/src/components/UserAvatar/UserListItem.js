import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({ handleFunction, user }) => {
  return (
    <Box
      // When this box is clicked, execute the passed handler function
      onClick={handleFunction}
      
      // Cursor becomes pointer on hover to indicate clickable
      cursor='pointer'
      
      // Background color of the box
      bg='#E8E8E8'
      
      // Styles applied when hovered
      _hover={{
        background: '#38B2AC',  // teal-ish background on hover
        color: 'white'          // text color turns white on hover
      }}
      
      // Full width container
      w='100%'
      
      // Use flexbox to arrange items horizontally
      display='flex'
      
      // Vertically align items center
      alignItems='center'
      
      // Text color default is black
      color='black'
      
      // Padding left and right: 3 units, padding top and bottom: 2 units
      px={3}
      py={2}
      
      // Margin bottom to separate from next list item
      mb={2}
      
      // Rounded corners
      borderRadius='lg'
    >
      {/* User avatar with small size */}
      <Avatar
        mr={2}          // margin right to separate from text
        size='sm'
        cursor='pointer'
        name={user.name}  // Used to generate initials if no image
        src={user.pic}    // User profile picture
      />
      
      {/* Box holding user name and email */}
      <Box>
        {/* User name */}
        <Text>{user.name}</Text>
        
        {/* User email with smaller font size */}
        <Text fontSize='xs'>
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  )
}

export default UserListItem
