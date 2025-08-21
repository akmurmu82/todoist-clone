import { 
  Box, 
  Divider, 
  HStack, 
  Spacer, 
  Text, 
  VStack, 
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
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
  FaTags,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const MenuItems = ({ toggleOnModalOpen, currentView, setCurrentView }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const { isOpen: isFiltersOpen, onOpen: onFiltersOpen, onClose: onFiltersClose } = useDisclosure();
  
  const { todos } = useSelector((state) => state.todos);

  // Calculate dynamic counts
  const getTodayCount = () => {
    if (!Array.isArray(todos)) return 0;
    const today = new Date().toLocaleDateString();
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      try {
        const todoDate = new Date(todo.dueDate.split('/').reverse().join('-')).toLocaleDateString();
        return todoDate === today && !todo.isCompleted;
      } catch (error) {
        console.error('Error parsing date:', todo.dueDate);
        return false;
      }
    }).length;
  };

  const getInboxCount = () => {
    if (!Array.isArray(todos)) return 0;
    return todos.filter(todo => !todo.isCompleted).length;
  };

  const getUpcomingCount = () => {
    if (!Array.isArray(todos)) return 0;
    const today = new Date().toLocaleDateString();
    return todos.filter(todo => {
      if (!todo.dueDate || todo.isCompleted) return false;
      try {
        const todoDate = new Date(todo.dueDate.split('/').reverse().join('-')).toLocaleDateString();
        const todayDate = new Date().toLocaleDateString();
        return new Date(todo.dueDate.split('/').reverse().join('-')) > new Date() && !todo.isCompleted;
      } catch (error) {
        console.error('Error parsing date:', todo.dueDate);
        return false;
      }
    }).length;
  };

  const menuItems = [
    { name: "Inbox", icon: FaInbox, count: getInboxCount() },
    { name: "Today", icon: FaRegCalendar, count: getTodayCount() },
    { name: "Upcoming", icon: FaCalendarAlt, count: getUpcomingCount() },
    { name: "Filters & Labels", icon: FaFilter },
  ];

  const projectItems = [
    { name: "Home 🏡", count: 5 },
    { name: "My work 🎯", count: 6 },
  ];

  const handleSearch = () => {
    onSearchOpen();
  };

  const handleFiltersAndLabels = () => {
    onFiltersOpen();
  };

  const handleMenuClick = (menuName) => {
    if (setCurrentView) {
      setCurrentView(menuName);
    }
    if (menuName === "Filters & Labels") {
      handleFiltersAndLabels();
    }
  };

  return (
    <>
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
          onClick={handleSearch}
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
            bg={currentView === item.name ? "red.100" : "transparent"}
            borderRadius="md"
            _hover={{ bg: "red.50", cursor: "pointer" }}
            onClick={() => handleMenuClick(item.name)}
          >
            <item.icon />
            <Text>{item.name}</Text>
            {item.count !== undefined && <Spacer />}
            {item.count !== undefined && (
              <Box
                as="span"
                bg="gray.200"
                borderRadius="full"
                px={2}
                fontSize="sm"
                minW="20px"
                textAlign="center"
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

      {/* Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Tasks</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search for tasks, projects, labels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            
            {searchQuery && (
              <Box mt={4}>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Search results for "{searchQuery}"
                </Text>
                {/* TODO: Implement actual search results */}
                <Text fontSize="sm" color="gray.400">
                  No results found. Try a different search term.
                </Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Filters & Labels Modal */}
      <Modal isOpen={isFiltersOpen} onClose={onFiltersClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters & Labels</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>Filters</Text>
                <VStack spacing={2} align="stretch">
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaFilter />}>
                    Assigned to me
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaFilter />}>
                    Assigned to others
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaFilter />}>
                    Priority 1
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaFilter />}>
                    Priority 2
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaFilter />}>
                    Priority 3
                  </Button>
                </VStack>
              </Box>
              
              <Divider />
              
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="bold">Labels</Text>
                  <Button size="sm" colorScheme="red" variant="outline">
                    + Add Label
                  </Button>
                </Flex>
                <VStack spacing={2} align="stretch">
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaTags />}>
                    @work
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaTags />}>
                    @personal
                  </Button>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaTags />}>
                    @urgent
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

MenuItems.propTypes = {
  toggleOnModalOpen: PropTypes.func,
  currentView: PropTypes.string,
  setCurrentView: PropTypes.func,
};

export default MenuItems;