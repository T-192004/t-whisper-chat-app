import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    // Stack arranges its children vertically with spacing by default
    <Stack>
      {/* Skeleton components simulate loading placeholders for chat items */}
      {/* Each Skeleton has a fixed height of 45px to represent a loading chat row */}
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
      <Skeleton height='45px' />
    </Stack>
  )
}

export default ChatLoading
