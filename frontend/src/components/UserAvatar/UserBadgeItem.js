import { CloseIcon } from "@chakra-ui/icons"
import { Badge } from "@chakra-ui/react"

const UserBadgeItem = ({ handleFunction, user }) => {
  return (
    <Badge
      // Horizontal padding inside the badge
      px={2}
      // Vertical padding inside the badge
      py={1}
      // Rounded corners for the badge
      borderRadius="lg"
      // Margin around the badge, with extra bottom margin
      m={1}
      mb={2}
      // Solid style variant of the badge
      variant="solid"
      // Font size of the badge text
      fontSize={12}
      // Purple color scheme for the badge background and text
      colorScheme="purple"
      // Pointer cursor to indicate it's clickable
      cursor="pointer"
      // When badge is clicked, execute the handler function
      onClick={handleFunction}
    >
      {/* Display user name */}
      {user.name}  
      {/* Close icon next to the name with left padding */}
      <CloseIcon pl={1}/>
    </Badge>
  )
}

export default UserBadgeItem
