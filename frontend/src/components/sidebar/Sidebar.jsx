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

const Sidebar = ({ toggleOnModalOpen, isOpen, onOpen, onClose }) => {
  const { user } = useSelector((state) => state.user);
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
                <Flex
                  width="100%"
                  alignItems={"center"}
                  py={0}
                  px={4}
                  color={"#db4c3e"}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                >
                  <Avatar
                    name="User Name"
                    mr={2}
                    boxSize={10}
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text>{user.name ? user.name : user.email}</Text>
                </Flex>
                <IconButton icon={<IoNotificationsOutline />} />
                <IconButton
                  icon={<BsLayoutSidebar />}
                  onClick={onClose}
                  aria-label="Close Menu"
                />
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
              src="https://bit.ly/dan-abramov"
            />
            <Text>{user.name ? user.name : user.email}</Text>
          </Flex>
          <IconButton icon={<IoNotificationsOutline />} />
          <IconButton
            icon={<BsLayoutSidebar />}
            onClick={onClose}
            aria-label="Close Menu"
          />
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
