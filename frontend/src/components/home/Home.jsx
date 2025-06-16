import { Box, HStack, Text, useDisclosure, Heading } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosAsync } from "../../redux/slices/todoSlice";
import AddTodoModal from "./AddTodoModal";
import TodoItemSkeleton from "./TodoItemSkeleton";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todos);
  // console.log("Todos in Home.jsx:", todos);

  const { user } = useSelector((state) => state.user);
  const [currTodoId, setCurrTodoId] = useState(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // Open modal for Add/Edit Todo
  const toggleOnModalOpen = (todoId) => {
    if (typeof todoId === "string") setCurrTodoId(todoId);
    onModalOpen();
    onClose();
  };

  // Fetch todos on mount if user is logged in
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchTodosAsync());
    }
  }, [dispatch, user?._id]);

  return (
    <>
      <Sidebar
        toggleOnModalOpen={toggleOnModalOpen}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      <Box ml={{ base: "0", md: "250px" }} p={{ base: "80px 50px", lg: "100px" }}>
        <Heading mb={4}>Inbox</Heading>

        {/* Show skeletons if loading */}
        {isLoading && [...Array(3)].map((_, idx) => <TodoItemSkeleton key={idx} />)}

        {/* No todos */}
        {!isLoading && Array.isArray(todos) && todos.length === 0 && (
          <Text fontSize="md" color="gray.600" textAlign="center">
            No todos to show.
          </Text>
        )}


        {/* Todos */}
        {!isLoading && Array.isArray(todos) &&
          todos
            .filter((todo) => todo && todo._id) // skip null or invalid todos
            .map((todo) => (
              <TaskItem
                key={todo._id}
                todo={todo}
                toggleOnModalOpen={toggleOnModalOpen}
              />
            ))}

        {/* Add Todo Button */}
        <HStack
          width="100%"
          py={2}
          px={4}
          borderRadius="md"
          _hover={{ color: "#db4c3e", cursor: "pointer" }}
          onClick={() => toggleOnModalOpen(null)}
        >
          <FaPlusCircle />
          <Text>Add Task</Text>
        </HStack>
      </Box>

      <AddTodoModal
        currTodoId={currTodoId}
        setCurrTodoId={setCurrTodoId}
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default Home;
