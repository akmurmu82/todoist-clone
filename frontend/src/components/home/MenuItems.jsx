import { Box, Divider, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaFilter,
  FaInbox,
  FaPlusCircle,
  FaRegCalendar,
  FaSearch,
} from "react-icons/fa";

const MenuItems = ({ toggleOnModalOpen }) => {
  const [activeMenu, setActiveMenu] = useState("Today");

  const menuItems = [
    { name: "Inbox", icon: FaInbox, count: 3 },
    { name: "Today", icon: FaRegCalendar, count: 2 },
    { name: "Upcoming", icon: FaCalendarAlt },
    { name: "Filters & Labels", icon: FaFilter },
  ];

  const projectItems = [
    { name: "Home 🏡", count: 5 },
    { name: "My work 🎯", count: 6 },
  ];

  return (
    <VStack spacing={2} align="start">
      {/* Add Task */}
      <HStack
        width="100%"
        py={2}
        px={4}
        borderRadius="md"
        color={"#db4c3e"}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={toggleOnModalOpen}
      >
        <FaPlusCircle />
        <Text>Add Task</Text>
      </HStack>

      {/* Search */}
      <HStack
        width="100%"
        py={2}
        borderRadius="md"
        px={4}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={() => setActiveMenu("Search")}
      >
        <FaSearch />
        <Text>Search</Text>
      </HStack>

      {/* Main Menu */}
      {menuItems.map((item, index) => (
        <HStack
          key={index}
          w="100%"
          py={2}
          px={4}
          bg={activeMenu === item.name ? "red.100" : "transparent"}
          borderRadius="md"
          _hover={{ bg: "red.50", cursor: "pointer" }}
          onClick={() => setActiveMenu(item.name)}
        >
          <item.icon />
          <Text>{item.name}</Text>
          {item.count && <Spacer />}
          {item.count && (
            <Box
              as="span"
              bg="gray.200"
              borderRadius="full"
              px={2}
              fontSize="sm"
            >
              {item.count}
            </Box>
          )}
        </HStack>
      ))}

      <Divider />

      {/* Projects Section */}
      <Text fontWeight="bold" px={4}>
        My Projects
      </Text>
      {projectItems.map((project, index) => (
        <HStack
          key={index}
          w="100%"
          py={2}
          px={4}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <Text>#{project.name}</Text>
          <Spacer />
          <Box as="span" bg="gray.200" borderRadius="full" px={2} fontSize="sm">
            {project.count}
          </Box>
        </HStack>
      ))}

      {/* Add a team */}
      <HStack py={2} px={4}>
        <BsPlusSquare />
        <Text>Add a team</Text>
      </HStack>

      {/* Browse Templates */}
      <HStack py={2} px={4}>
        <Text>Browse templates</Text>
      </HStack>
    </VStack>
  );
};

MenuItems.propTypes = {
  toggleOnModalOpen: PropTypes.func,
};

export default MenuItems;
