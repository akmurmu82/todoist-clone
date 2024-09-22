import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import MenuItems from "../home/MenuItems";

const Sidebar = ({ toggleOnModalOpen, isOpen, onOpen, onClose }) => {
  return (
    <>
      {/* Mobile View */}
      <IconButton
        icon={<FaBars />}
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
          <DrawerCloseButton />
          <DrawerBody p={4}>
            <MenuItems toggleOnModalOpen={toggleOnModalOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop View */}
      <Box
        w={{ base: "0", md: "250px" }}
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
        <HStack mb={6} px={4}>
          <Avatar name="User Name" src="https://bit.ly/dan-abramov" />
          <Text>hackak4444@gmail.com</Text>
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
