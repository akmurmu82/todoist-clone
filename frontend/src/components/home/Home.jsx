import {
  Box,
  VStack,
  HStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Heading,
} from "@chakra-ui/react";
import {
  FaInbox,
  FaRegCalendar,
  FaFlag,
  FaBell,
  FaChevronDown,
  FaClock,
  FaPlusCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { DayPicker as Calendar } from "react-day-picker";
import Sidebar from "../sidebar/Sidebar";
import TaskItem from "./Task";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, loadTodo } from "../../redux/slices/todoSlice";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dueDate, setDueDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Inside your component
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { todos } = useSelector((state) => state.todos);
  const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";
  console.log(user, todos);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  function toggleOnModalOpen() {
    onModalOpen();
  }

  const [priority, setPriority] = useState(null);

  // formatting the priority before sending the request
  const formatPriority = (priority) => {
    let formattedPriority = "";
    if (priority == 1) {
      formattedPriority = "high";
    } else if (priority == 2) {
      formattedPriority = "medium";
    } else if (priority == 3) {
      formattedPriority = "low";
    } else {
      formattedPriority = "low"; // setting default priority is "low"
    }
    console.log("formattedPriority:", formattedPriority);
    return formattedPriority;
  };

  // priorities
  const priorityOptions = [
    { level: 1, color: "red.500", label: "High" },
    { level: 2, color: "orange.500", label: "Medium" },
    { level: 3, color: "blue.500", label: "Low" },
  ];

  // Data
  const quickDateOptions = [
    { label: "Today", value: new Date() },
    {
      label: "Tomorrow",
      value: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      label: "Next weekend",
      value: new Date(
        new Date().setDate(
          new Date().getDate() + ((6 - new Date().getDay() + 7) % 7)
        )
      ),
    },
    {
      label: "Next week",
      value: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  ];

  const handleQuickDateSelect = (date) => {
    setDueDate(date);
  };

  const handleCalendarSelect = (date) => {
    // console.log("date:", date.toLocaleDateString());
    setDueDate(date);
  };

  // Fetching Todos
  const fetchTodos = async () => {
    try {
      let res = await axios.get(`${BaseBackendURL}/todos`, {
        body: { _id: user._id },

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.status) {
        console.log(res.data.data);
        dispatch(loadTodo(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("todos:", todos);
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Adding Todos
  const handleAddTodo = async () => {
    console.log({
      title,
      description,
      createdOn: new Date().toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      userId: user._id,
      priority,
      token,
    });
    let res = await axios.post(
      `${BaseBackendURL}/todos/add`,
      {
        title,
        description,
        createdOn: dueDate.toLocaleDateString(),
        userId: user._id,
        priority: formatPriority(priority),
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    if (res.data.status) {
      dispatch(addTodo(res.data.data));
      onModalClose();
      setDueDate("");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <Sidebar
        toggleOnModalOpen={toggleOnModalOpen}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      {/* Main content */}
      <Box
        ml={{ base: "0", md: "250px" }}
        p={{ base: "80px 50px", lg: "100px" }}
      >
        <Heading>Inbox</Heading>

        {/* Listing Todos */}
        {todos.length == 0 ? (
          <h1>No todos to show</h1>
        ) : (
          todos.map(({ _id, title, description, isCompleted, priority }) => (
            <TaskItem
              key={_id}
              todoId={_id}
              title={title}
              description={description}
              isCompleted={isCompleted}
              priority={priority}
            />
          ))
        )}
        {/* Add Task */}
        <HStack
          width="100%"
          py={2}
          px={4}
          borderRadius="md"
          _hover={{ color: "#db4c3e", cursor: "pointer" }}
          onClick={toggleOnModalOpen}
        >
          <FaPlusCircle />
          <Text>Add Task</Text>
        </HStack>
      </Box>

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent p={1} fontSize="sm" top="-20%">
          <ModalBody>
            <Input
              variant="unstyled"
              p={0}
              m={0}
              fontSize="lg"
              placeholder="Task name"
              mb={4}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              variant="unstyled"
              p={0}
              m={0}
              fontSize="sm"
              placeholder="Description"
              mb={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Task options */}
            <HStack spacing={4} mb={4} color="gray">
              {/* Due Date button */}
              <Popover placement="bottom-start">
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Icon as={FaRegCalendar} />}
                  >
                    {dueDate ? dueDate.toLocaleDateString() : "Due date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent width="300px">
                  <PopoverBody>
                    <VStack align="stretch" spacing={2}>
                      <Input placeholder="Type a due date" size="sm" mb={2} />

                      {/* Quick Date option */}
                      {quickDateOptions.map((option) => (
                        <Button
                          key={option.label}
                          variant="ghost"
                          justifyContent="space-between"
                          onClick={() => handleQuickDateSelect(option.value)}
                        >
                          <Text>{option.label}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {option.value.toLocaleDateString(undefined, {
                              weekday: "short",
                            })}
                          </Text>
                        </Button>
                      ))}

                      {/* Calender */}
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={handleCalendarSelect}
                        initialFocus
                      />
                      <Button
                        leftIcon={<Icon as={FaClock} />}
                        variant="ghost"
                        justifyContent="flex-start"
                      >
                        Time
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              {/* Priority */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="outline"
                  size="sm"
                  rightIcon={<FaChevronDown />}
                >
                  <HStack>
                    <Icon
                      as={FaFlag}
                      color={
                        priority
                          ? priorityOptions[priority - 1].color
                          : "gray.500"
                      }
                    />
                    <Text>
                      {priority
                        ? `${priorityOptions[priority - 1].label}`
                        : "Priority"}
                    </Text>
                  </HStack>
                </MenuButton>

                <MenuList>
                  {priorityOptions.map((option) => (
                    <MenuItem
                      key={option.level}
                      onClick={() => setPriority(option.level)}
                    >
                      <HStack>
                        <Icon as={FaFlag} color={option.color} />
                        <Text>{option.label}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Button variant="outline" size="sm" leftIcon={<FaBell />}>
                Reminders
              </Button>
              <Button variant="outline" size="sm">
                ...
              </Button>
            </HStack>
          </ModalBody>
          <ModalFooter justifyContent="space-between" pt={4}>
            {/* Toggle Dropdown */}
            <Button leftIcon={<FaInbox />} onClick={toggleDropdown}>
              Inbox
            </Button>

            <HStack>
              <Button variant="ghost" onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleAddTodo}
                isDisabled={!title || !dueDate}
              >
                Add task
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
