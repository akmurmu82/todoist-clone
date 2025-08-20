import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Link,
  Spacer,
  Icon,
  VStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import {
  FaChevronDown,
  FaPlug,
  FaClipboard,
  FaBook,
  FaLifeRing,
  FaLightbulb,
  FaArrowDown,
  FaBars,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Reusable MenuItem component
const MenuItem = ({ title, href, hasDropdown, onClick }) => (
  <Link
    href={href}
    px="2"
    py="1"
    _hover={{ bg: "gray.100", borderRadius: "md" }}
    display="flex"
    alignItems="center"
    onClick={onClick}
  >
    {title}
    {hasDropdown && <Icon as={FaChevronDown} ml={1} />}
  </Link>
);

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hasDropdown: PropTypes.bool,
  onClick: PropTypes.func,
};

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { title: "Features", href: "#", hasDropdown: false },
    { title: "For Teams", href: "#", hasDropdown: false },
    { title: "Resources", href: "#", hasDropdown: true },
    { title: "Pricing", href: "#", hasDropdown: false },
  ];

  const submenuItems = [
    { title: "Integrations", href: "#", icon: FaPlug },
    { title: "Templates", href: "#", icon: FaClipboard },
    { title: "Getting Started", href: "#", icon: FaBook },
    { title: "Help Center", href: "#", icon: FaLifeRing },
    { title: "Productivity Methods + Quiz", href: "#", icon: FaLightbulb },
    { title: "Inspiration Hub", href: "#", icon: FaLightbulb },
    { title: "Downloads", href: "#", icon: FaArrowDown },
  ];

  return (
    <Box px={6} py={4} boxShadow="sm" position="sticky" top="0" bg="white" zIndex="1000">
      <Flex alignItems="center">
        {/* Logo Section */}
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          todoist
        </Text>

        <Spacer />

        {/* Desktop Navigation */}
        <HStack
          as="nav"
          spacing={8}
          fontSize="md"
          fontWeight="medium"
          color="gray.700"
          display={{ base: "none", md: "flex" }}
          pr={2}
          borderRight={"1px solid grey"}
        >
          {menuItems.map((item) => (
            <Box
              key={item.title}
              position="relative"
              onMouseEnter={() => item.hasDropdown && setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <MenuItem
                title={item.title}
                href={item.href}
                hasDropdown={item.hasDropdown}
              />
              {item.title === "Resources" && isDropdownOpen && (
                <VStack
                  position="absolute"
                  top="100%"
                  bg="white"
                  w="300px"
                  boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  borderRadius="md"
                  p={1}
                  spacing={2}
                  alignItems="left"
                  transition="all 0.3s ease-in-out"
                  opacity={isDropdownOpen ? 1 : 0}
                  transform={
                    isDropdownOpen ? "translateY(0)" : "translateY(-20px)"
                  }
                  zIndex={10}
                >
                  {submenuItems.map((submenu) => (
                    <Link
                      key={submenu.title}
                      href={submenu.href}
                      display="flex"
                      alignItems="center"
                      justifyContent={"flex-start"}
                      px="2"
                      py="1"
                      _hover={{
                        bg: "gray.100",
                        borderRadius: "md",
                      }}
                    >
                      <Icon as={submenu.icon} mr={2} />
                      {submenu.title}
                    </Link>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </HStack>

        {/* Desktop Buttons */}
        <HStack spacing={6} ml={2} display={{ base: "none", md: "flex" }}>
          <Link
            href="/auth/login"
            fontSize="md"
            fontWeight="medium"
            color="gray.600"
            px={"2"}
            py={"1"}
            _hover={{ bg: "gray.100", borderRadius: "md" }}
          >
            Log in
          </Link>
          <Button
            colorScheme="red"
            size="md"
            px={6}
            onClick={() => navigate("/auth/signup")}
          >
            Start for free
          </Button>
        </HStack>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="Open menu"
          icon={<FaBars />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="ghost"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {menuItems.map((item) => (
                <Box key={item.title} w="100%">
                  <MenuItem
                    title={item.title}
                    href={item.href}
                    hasDropdown={item.hasDropdown}
                  />
                  {item.title === "Resources" && (
                    <VStack align="start" pl={4} spacing={2} mt={2}>
                      {submenuItems.map((submenu) => (
                        <Link
                          key={submenu.title}
                          href={submenu.href}
                          display="flex"
                          alignItems="center"
                          px="2"
                          py="1"
                          _hover={{ bg: "gray.100", borderRadius: "md" }}
                        >
                          <Icon as={submenu.icon} mr={2} />
                          {submenu.title}
                        </Link>
                      ))}
                    </VStack>
                  )}
                </Box>
              ))}

              {/* Mobile Buttons */}
              <Link
                href="/auth/login"
                fontSize="md"
                fontWeight="medium"
                color="gray.600"
              >
                Log in
              </Link>
              <Button
                colorScheme="red"
                w="full"
                onClick={() => {
                  onClose();
                  navigate("/auth/signup");
                }}
              >
                Start for free
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;