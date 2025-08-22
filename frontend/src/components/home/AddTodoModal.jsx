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
  Spinner,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAsync, updateTodoAsync } from "../../redux/slices/todoSlice";

function AddTodoModal({ currTodoId, setCurrTodoId, isModalOpen, onModalClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { todos } = useSelector((state) => state.todos);
  const [isLoading, setIsLoading] = useState(false);

  const currTodo =
    Array.isArray(todos) && currTodoId
      ? todos.find((todo) => todo._id === currTodoId)
      : null;

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(null);

  // When modal opens or currTodo changes, update form fields
  useEffect(() => {
    if (currTodo) {
      setTitle(currTodo.title || "");
      setDueDate(currTodo.dueDate || "");
      setDescription(currTodo.description || "");
      setPriority(
        currTodo.priority === "high"
          ? 1
          : currTodo.priority === "medium"
            ? 2
            : 3
      );
    } else {
      setTitle("");
      setDueDate("");
      setDescription("");
      setPriority(null);
    }
  }, [currTodoId, currTodo]);

  const formatPriority = (level) => {
    switch (level) {
      case 1:
        return "high";
      case 2:
        return "medium";
      case 3:
        return "low";
      default:
        return "low";
    }
  };

  const quickDateOptions = [
    { label: "Today", value: new Date() },
    {
      label: "Tomorrow",
      value: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    {
      label: "Next weekend",
      value: new Date(
        new Date().setDate(new Date().getDate() + ((6 - new Date().getDay() + 7) % 7))
      ),
    },
    {
      label: "Next week",
      value: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  ];

  const priorityOptions = [
    { level: 1, color: "red.500", label: "High" },
    { level: 2, color: "orange.500", label: "Medium" },
    { level: 3, color: "blue.500", label: "Low" },
  ];

  const handleSubmit = async () => {
    if (!title || !dueDate || !user?._id) return;

    const payload = {
      title,
      dueDate:
        typeof dueDate !== "string"
          ? dueDate.toLocaleDateString()
          : dueDate,
      userId: user._id,
      priority: formatPriority(priority),
      ...(description?.trim() && { description }),
    };

    setIsLoading(true);

    try {
      if (currTodoId) {
        await dispatch(updateTodoAsync({ todoId: currTodoId, updatedData: payload })).unwrap();
      } else {
        await dispatch(createTodoAsync(payload)).unwrap();
      }

      onModalClose();
      setCurrTodoId(null);
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setIsLoading(false);
      setTitle("");
      setDueDate("");
      setDescription("");
      setPriority(null);
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
            fontSize="lg"
            placeholder="Task name"
            mb={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            variant="unstyled"
            p={0}
            fontSize="sm"
            placeholder="Description"
            mb={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <HStack spacing={4} mb={4} color="gray">
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon as={FaRegCalendar} />}
                >
                  {dueDate
                    ? typeof dueDate !== "string"
                      ? dueDate.toLocaleDateString()
                      : dueDate
                    : "Due date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent width="300px">
                <PopoverBody>
                  <VStack align="stretch" spacing={2}>
                    {quickDateOptions.map((option) => (
                      <Button
                        key={option.label}
                        variant="ghost"
                        justifyContent="space-between"
                        onClick={() => setDueDate(option.value)}
                      >
                        <Text>{option.label}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {option.value.toLocaleDateString(undefined, {
                            weekday: "short",
                          })}
                        </Text>
                      </Button>
                    ))}
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
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
                      priority ? priorityOptions[priority - 1].color : "gray.500"
                    }
                  />
                  <Text>
                    {priority
                      ? priorityOptions[priority - 1].label
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
          <Button leftIcon={<FaInbox />}>Inbox</Button>

          <HStack>
            <Button variant="ghost" onClick={onModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleSubmit}
              isDisabled={!title || !dueDate}
            >
              {isLoading ? (
                <HStack spacing={2}>
                  <Spinner size="sm" />
                  <Text>{currTodoId ? "Updating..." : "Creating..."}</Text>
                </HStack>
              ) : currTodoId ? (
                "Update task"
              ) : (
                "Add task"
              )}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

AddTodoModal.propTypes = {
  currTodoId: PropTypes.string,
  setCurrTodoId: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default AddTodoModal;
