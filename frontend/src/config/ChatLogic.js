// Returns the name of the other user in a 1-on-1 chat
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// Returns the full user object of the other user in a 1-on-1 chat
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// Checks if the next message has a different sender (or undefined) and current message sender is not the logged user
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
     (messages[i + 1].sender._id === undefined && messages[i].sender._id !== userId))
  );
};

// Checks if the current message is the last message, and is not sent by logged user
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId._id &&
    messages[messages.length - 1].sender._id
  );
};

// Determines margin-left for message bubble grouping (returns 33, 0 or 'auto')
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  ) return 33;
  else if (
    (i < messages.length - 1 &&
     messages[i + 1].sender._id !== m.sender._id &&
     messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) return 0;
  else return "auto";
};

// Checks if previous message sender is the same as the current message sender
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
