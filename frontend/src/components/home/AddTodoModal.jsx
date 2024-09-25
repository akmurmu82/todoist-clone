import {
  Button,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { DayPicker as Calendar } from "react-day-picker";
import {
  FaBell,
  FaChevronDown,
  FaClock,
  FaFlag,
  FaInbox,
  FaRegCalendar,
} from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addTodo } from "../../redux/slices/todoSlice";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function AddTodoModal({ isModalOpen, onModalClose }) {
  const [dueDate, setDueDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  //   const { todos } = useSelector((state) => state.todos);

  // Inside your component
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [priority, setPriority] = useState(null);
  const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";

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

  // Adding Todos
  const handleAddTodo = async () => {
    console.log({
      title,
      description,
      dueDate: dueDate.toLocaleDateString(),
      userId: user._id,
      priority: formatPriority(priority),
    });
    let res = await axios.post(
      `${BaseBackendURL}/todos/add`,
      {
        title,
        description,
        dueDate: dueDate.toLocaleDateString(),
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
  );
}

AddTodoModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default AddTodoModal;
