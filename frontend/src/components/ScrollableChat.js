import { useEffect, useRef } from 'react';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../config/ChatLogic';
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState(); // Get the current logged-in user from context
  const bottomRef = useRef(null); // Create a ref to the bottom of the chat for auto-scroll

  // Effect to scroll to the bottom every time messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to bottom
  }, [messages]);

  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: '10px' }}>
      {/* Map through all the messages */}
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {/* Show Avatar only if:
              - The message is not from the current user
              - AND it's either the first message from that sender in a row OR the last message overall
            */}
            {(m.sender._id !== user._id &&
              (isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id))) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic} // Avatar image URL
                />
              </Tooltip>
            )}

            {/* Message bubble styling */}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`, // Blue if own message, green if others
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%', // Limit width for readability
                marginTop: isSameUser(messages, m, i, user._id) ? '3px' : '10px', // Smaller top margin if same user as previous message
                marginLeft: isSameSenderMargin(messages, m, i, user._id), // Adjust left margin to align messages nicely
              }}
            >
              {m.content} {/* The actual message text */}
            </span>
          </div>
        ))}
      {/* Invisible div to scroll into view at bottom */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ScrollableChat;
