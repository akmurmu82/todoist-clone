import { useState } from "react";
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
  const [checked, setChecked] = useState(todoCompleted);
  
  // Use the prop to determine if this is in completed section
  const showAsCompleted = isCompleted || todoCompleted;

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
    }
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

  return (
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
          onChange={() => handleUpdate(_id, { isCompleted: !checked })}
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
                            />
                          </Tooltip>
                          <Tooltip label="Weekend" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RiSofaLine} />}
                              flex={1}
                            />
                          </Tooltip>
                          <Tooltip label="Next week" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={FaRedo} />}
                              flex={1}
                            />
                          </Tooltip>
                          <Tooltip label="No date" placement="top">
                            <IconButton
                              size="sm"
                              variant="ghost"
                              icon={<Icon as={RxValueNone} />}
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
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="orange.500" />}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="blue.500" />}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FaFlag} color="gray.500" />}
                          />
                        </HStack>
                      </VStack>

                      <Option
                        icon={FaArrowRight}
                        text="Move to..."
                        shortcut="M"
                      />
                      <Option icon={FaCopy} text="Duplicate" />
                      <Option
                        icon={FaLink}
                        text="Copy link to task"
                        shortcut="Ctrl C"
                      />
                      <Option
                        icon={FaTrash}
                        text="Delete"
                        isDelete={true}
                        shortcut="Ctrl D"
                        handleClick={handleDeleteTodo}
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
