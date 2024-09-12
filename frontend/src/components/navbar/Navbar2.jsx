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
} from "@chakra-ui/react";
import {
  FaChevronDown,
  FaPlug,
  FaClipboard,
  FaBook,
  FaLifeRing,
  FaLightbulb,
  FaArrowDown,
} from "react-icons/fa"; // Import necessary icons
import PropTypes from "prop-types";

// Reusable MenuItem component
const MenuItem = ({ title, href, hasDropdown }) => (
  <Link
    href={href}
    px="2"
    py="1"
    _hover={{ bg: "gray.100", borderRadius: "md" }}
    display="flex"
    alignItems="center"
  >
    {title}
    {hasDropdown && <Icon as={FaChevronDown} ml={1} />}
  </Link>
);

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hasDropdown: PropTypes.bool,
};

MenuItem.defaultProps = {
  hasDropdown: false,
};

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <Box px={8} py={4} boxShadow="sm">
      <Flex alignItems="center">
        {/* Logo Section */}
        <HStack spacing={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="red.500" mr={8}>
              todoist
            </Text>
          </Box>
        </HStack>

        {/* Adjust Left Alignment */}
        <Spacer />

        {/* Navigation Links */}
        <HStack
          as="nav"
          spacing={8}
          fontSize="md"
          pr={2}
          borderRight={"1px solid grey"}
          fontWeight="medium"
          color="gray.700"
          //   ml={20} // Adjust the left margin to match alignment
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
                  top="100%" // Position just below the Resources menu
                  bg="white"
                  w="300px"
                  //   boxShadow="lg"
                  boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  borderRadius="md"
                  p={1}
                  spacing={2}
                  alignItems="left"
                  transition="all 0.8s ease-in-out"
                  opacity={isDropdownOpen ? 1 : 0}
                  transform={
                    isDropdownOpen ? "translateY(0)" : "translateY(-50px)"
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
                      <Icon as={submenu.icon} mr={2} /> {/* Add icon */}
                      {submenu.title}
                    </Link>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </HStack>

        {/* Buttons */}
        <HStack spacing={6} ml={2}>
          <Link
            href="#"
            fontSize="md"
            fontWeight="medium"
            color="gray.600"
            px={"2"}
            py={"1"}
            _hover={{ bg: "gray.100", borderRadius: "md" }}
          >
            Log in
          </Link>
          <Button colorScheme="red" size="md" px={6}>
            Start for free
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

Navbar.propTypes = {
  props: PropTypes.any,
};

export default Navbar;
