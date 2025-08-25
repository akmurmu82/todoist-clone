import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Checkbox,
  Icon,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Divider,
  Tooltip,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Input,
} from "@chakra-ui/react";
import {
  FaRegCalendar,
  FaPencilAlt,
  FaRegCommentAlt,
  FaEllipsisH,
  FaSun,
  FaRedo,
  FaFlag,
  FaArrowRight,
  FaCopy,
  FaLink,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";
import { RiSofaLine } from "react-icons/ri";
import { RxValueNone } from "react-icons/rx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../../redux/slices/todoSlice";
import { isToday, isTomorrow, format, parse } from "date-fns";

export default function TaskItem({
  todo,
  toggleOnModalOpen,
  isCompleted = false,
}) {
  const {
    title = "Sample Task",
    _id,
    description = "This is a sample task description",
    dueDate,
    isCompleted: todoCompleted = false,
    priority = "medium",
  } = todo;
  const dispatch = useDispatch();
  const toast = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [checked, setChecked] = useState(isCompleted || todoCompleted);
  const { isOpen: isMoveModalOpen, onOpen: onMoveModalOpen, onClose: onMoveModalClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState("Inbox");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Update local state when props change
  useEffect(() => {
    setChecked(isCompleted || todoCompleted);
  }, [isCompleted, todoCompleted]);

  // Use the checkbox state to determine if this should show as completed
  const showAsCompleted = checked;

  // Check if the due date is today or tomorrow
  const parsedDueDate = dueDate ? parse(dueDate, "dd/MM/yyyy", new Date()) : new Date();
  const isDueToday = isToday(parsedDueDate);
  const isDueTomorrow = isTomorrow(parsedDueDate);
  const formattedDate = isDueToday
    ? "Today"
    : isDueTomorrow
      ? "Tomorrow"
      : format(parsedDueDate, "dd/MM/yyyy");

  // Handle update Todo: title, description, priority, isCompleted
  const handleUpdate = async (todoId, updatedFields) => {
    setIsUpdating(true);
    try {
      // Dispatch the thunk with _id and updated fields
      const res = await dispatch(updateTodoAsync({ todoId, updatedFields }));
      // console.log(todoId, updatedFields);
      // console.log("Update response:", res);

      if (res.type.endsWith("fulfilled")) {
        // Optionally update local state like checkbox
        if ("isCompleted" in updatedFields) {
          setChecked(updatedFields.isCompleted);
        }
        // console.log(res)
        toast({
          title: "Todo updated.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error(res.payload || "Failed to update todo");
      }
    } catch (err) {
      console.error("Error updating todo:", err);
      toast({
        title: "Failed to update todo.",
        status: "error",
        duration: 2000,
        isClosable: true,
        description: err.message || "Something went wrong",
      });
      // Revert checkbox state on error
      setChecked(!checked);
    }
      setIsUpdating(false);
  };

  // Delete Todo
  const handleDeleteTodo = async () => {
    try {
      const resultAction = await dispatch(deleteTodoAsync(_id));
      if (deleteTodoAsync.fulfilled.match(resultAction)) {
        toast({
          title: "Todo deleted successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error(resultAction.payload || "Failed to delete todo");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting todo",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle due date updates
  const handleDueDateUpdate = (newDate) => {
    const formattedDate = newDate.toLocaleDateString();
    handleUpdate(_id, { dueDate: formattedDate });
  };

  // Handle priority updates
  const handlePriorityUpdate = (newPriority) => {
    handleUpdate(_id, { priority: newPriority });
  };

  // Handle duplicate todo
  const handleDuplicate = () => {
    const duplicatedTodo = {
      title: `${title} (Copy)`,
      description,
      priority,
      dueDate,
    };
    // You would need to implement createTodoAsync in your redux slice
    toast({
      title: "Todo duplicated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle copy link
  const handleCopyLink = () => {
    const link = `${window.location.origin}/todo/${_id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle move to project
  const handleMoveToProject = () => {
    // Implement project moving logic here
    toast({
      title: `Todo moved to ${selectedProject}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onMoveModalClose();
  };
  return (
    <>
    <Box
      borderBottomWidth={1}
      borderRadius={"md"}
      px={2}
      opacity={showAsCompleted ? 0.6 : 1}
      textDecoration={showAsCompleted ? "line-through" : "none"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex align="start">
        <Checkbox
          size="lg"
          colorScheme={priority === "high" ? "red" : priority === "medium" ? "blue" : "white"}
          mr={3}
          mt={1}
          isChecked={checked}
          isDisabled={isUpdating}
          onChange={(e) => {
            const newCheckedState = e.target.checked;
            setChecked(newCheckedState); // Update UI immediately
            handleUpdate(_id, { isCompleted: newCheckedState });
          }}
        />
        <VStack align="start" spacing={1} flex={1}>
          <Text 
            fontWeight="medium"
            color={showAsCompleted ? "gray.500" : "inherit"}
          >
            {title}
          </Text>
          <Text 
            fontSize="sm" 
            color={showAsCompleted ? "gray.400" : "gray.600"}
          >
            {description}
          </Text>
          <HStack>
            <Icon 
              as={FaRegCalendar} 
              color={showAsCompleted ? "gray.400" : "orange.500"} 
              boxSize={3} 
            />
            <Text 
              fontSize="xs" 
              color={showAsCompleted ? "gray.400" : "orange.500"}
            >
              {formattedDate}
            </Text>
          </HStack>
        </VStack>
        {isHovering && (
          <HStack spacing={1}>
            <IconButton
              aria-label="Edit task"
              icon={<FaPencilAlt />}
              size="sm"
              variant="ghost"
              onClick={() => toggleOnModalOpen(_id)}
            />
            <IconButton
              aria-label="Comment on task"
              icon={<FaRegCommentAlt />}
              size="sm"
              variant="ghost"
            />
            <Popover
              placement="bottom-end"
              strategy="fixed"
              modifiers={[
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: [
                      "top-end",
                      "bottom-start",
                      "top-start",
                    ],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    padding: 8,
                  },
                },
              ]}
            >
              <PopoverTrigger>
                <Button size="sm" variant="ghost">
                  <Icon as={FaEllipsisH} />
                </Button>
              </PopoverTrigger>
              <PopoverContent width="250px">
                <PopoverBody p={0}>
                  <Box
                    maxHeight="400px"
                    overflowY="auto"
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "gray.300",
                        borderRadius: "24px",
                      },
                    }}
                  >
                    <VStack align="stretch" spacing={0} divider={<Divider />}>
                      <Option
                        icon={FaPencilAlt}
                        text="Edit"
                        shortcut="Ctrl E"
                        handleClick={() => toggleOnModalOpen(_id)}
                      />

                      <VStack align="stretch" p={2} spacing={1}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500">
                          Due date
                        </Text>
                        <HStack>
                          <Tooltip label="Tomorrow" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={FaSun} />}
                              flex={1}
                              onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                handleDueDateUpdate(tomorrow);
                              }}
                            />
                          </Tooltip>
                          <Tooltip label="Weekend" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RiSofaLine} />}
                              flex={1}
                              onClick={() => {
                                const weekend = new Date();
                                const daysUntilSaturday = (6 - weekend.getDay()) % 7;
                                weekend.setDate(weekend.getDate() + daysUntilSaturday);
                                handleDueDateUpdate(weekend);
                              }}
                            />
                          </Tooltip>
                          <Tooltip label="Next week" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={FaRedo} />}
                              flex={1}
                              onClick={() => {
                                const nextWeek = new Date();
                                nextWeek.setDate(nextWeek.getDate() + 7);
                                handleDueDateUpdate(nextWeek);
                              }}
                            />
                          </Tooltip>
                          <Tooltip label="No date" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RxValueNone} />}
                              onClick={() => handleUpdate(_id, { dueDate: null })}
                            />
                          </Tooltip>
                        </HStack>
                      </VStack>

                      <VStack align="stretch" p={2} spacing={1}>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500">
                          Priority
                        </Text>
                        <HStack>
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="red.500" />}
                            onClick={() => handlePriorityUpdate("high")}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="orange.500" />}
                            onClick={() => handlePriorityUpdate("medium")}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="blue.500" />}
                            onClick={() => handlePriorityUpdate("low")}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="gray.500" />}
                            onClick={() => handlePriorityUpdate("none")}
                          />
                        </HStack>
                      </VStack>

                      <Option
                        icon={FaArrowRight}
                        text="Move to..."
                        shortcut="M"
                        handleClick={onMoveModalOpen}
                      />
                      <Option icon={FaCopy} text="Duplicate" />
                      <Option
                        icon={FaLink}
                        text="Copy link to task"
                        shortcut="Ctrl C"
                        handleClick={handleDuplicate}
                      />
                      <Option
                        icon={FaTrash}
                        text="Delete"
                        isDelete={true}
                        shortcut="Ctrl D"
                        handleClick={handleDeleteTodo}
                        // handleClick={handleCopyLink}
                      />
                    </VStack>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        )}
      </Flex>
    </Box>

    {/* Move to Project Modal */}
    <Modal isOpen={isMoveModalOpen} onClose={onMoveModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Move to Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Select a project to move "{title}" to:
            </Text>
            <Select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="Inbox">📥 Inbox</option>
              <option value="Home">🏡 Home</option>
              <option value="Work">🎯 My work</option>
              <option value="Personal">👤 Personal</option>
            </Select>
            <HStack spacing={3} justify="flex-end">
              <Button variant="ghost" onClick={onMoveModalClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleMoveToProject}>
                Move
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
}

function Option({ icon, text, shortcut, rightIcon, isDelete, handleClick }) {
  return (
    <Button
      variant="ghost"
      fontWeight="normal"
      justifyContent="space-between"
      width="100%"
      height="auto"
      py={2}
      onClick={handleClick}
    >
      <HStack color={isDelete ? "#db4c3e" : ""}>
        <Icon as={icon} />
        <Text>{text}</Text>
      </HStack>
      <HStack>
        {shortcut && (
          <Text fontSize="xs" color="gray.500">
            {shortcut}
          </Text>
        )}
        {rightIcon && <Icon as={rightIcon} />}
      </HStack>
    </Button>
  );
}

// Prop Validation
TaskItem.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  dueDate: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  todo: PropTypes.object,
  toggleOnModalOpen: PropTypes.func,
  isCompleted: PropTypes.bool,
};

Option.propTypes = {
  icon: PropTypes.func,
  text: PropTypes.string,
  shortcut: PropTypes.string,
  rightIcon: PropTypes.func,
  isDelete: PropTypes.bool,
  handleClick: PropTypes.func,
};
