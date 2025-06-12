import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import MenuItems from "../home/MenuItems";
import { useSelector } from "react-redux";
import { BsLayoutSidebar } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import ProfilePopover from "./ProfilePopover";

const Sidebar = ({ toggleOnModalOpen, isOpen, onOpen, onClose }) => {
  const { user } = useSelector((state) => state.user);
  // console.log("user:", user)
  return (
    <>
      {/* Mobile View */}
      <IconButton
        icon={<BsLayoutSidebar />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        aria-label="Open Menu"
        position="fixed"
        top={4}
        left={4}
        zIndex={10}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#db4c3e",
                borderRadius: "24px",
              },
            }}
          >
            <DrawerBody p={4}>
              {/* User Profile */}
              <HStack mb={6}>
                <ProfilePopover
                  user={user}
                  trigger={
                    <Flex
                      alignItems="center"
                      py={2}
                      px={4}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      borderRadius="md"
                    >
                      <Avatar
                        name={user.name || user.email}
                        src={user.profilePic}
                        size="sm"
                        mr={2}
                      />
                      <Text fontWeight="bold">
                        {user.name.substring(0, 10) + "..." ||
                          user.email.substring(0, 10) + "..."}
                      </Text>
                    </Flex>
                  }
                  icons={
                    <>
                      <IconButton icon={<IoNotificationsOutline />} />
                      <IconButton
                        icon={<BsLayoutSidebar />}
                        onClick={onClose}
                        aria-label="Close Menu"
                      />
                    </>
                  }
                ></ProfilePopover>
              </HStack>

              <MenuItems toggleOnModalOpen={toggleOnModalOpen} />
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Desktop View */}
      <Box
        w={{ base: "0", md: "300px" }}
        display={{ base: "none", md: "block" }}
        h="100vh"
        bg="white"
        p={4}
        borderRight="1px solid"
        borderColor="gray.200"
        position="fixed"
        fontSize={"sm"}
      >
        {/* User Profile */}
        <HStack mb={6}>
          <ProfilePopover
            user={user}
            trigger={
              <Flex
                width="100%"
                alignItems={"center"}
                py={0}
                px={4}
                fontWeight={"bold"}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                borderRadius="md"
              >
                <Avatar
                  name="User Name"
                  mr={2}
                  boxSize={10}
                  src={user.profilePic || "https://bit.ly/dan-abramov"}
                />
                <Text>
                  {user?.name
                    ? user.name
                    : user.email.substring(0, 10) + "..."}
                  {/* {user?.name.length > 10 ? user.name.substring(0, 10)
                    : user.name.substring(0, 10) + "..."
                    || user.email.substring(0, 10) + "..."} */}
                </Text>
              </Flex>
            }
            icons={
              <>
                <IconButton icon={<IoNotificationsOutline />} />
                <IconButton
                  icon={<BsLayoutSidebar />}
                  onClick={onClose}
                  aria-label="Close Menu"
                />
              </>
            }
          ></ProfilePopover>
        </HStack>

        <MenuItems toggleOnModalOpen={toggleOnModalOpen} />
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  toggleOnModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default Sidebar;
