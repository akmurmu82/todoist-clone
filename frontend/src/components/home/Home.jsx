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

  const { user } = useSelector((state) => state.user);
  const [currTodoId, setCurrTodoId] = useState(null);
  const [currentView, setCurrentView] = useState("Inbox");

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

  // Filter todos based on current view
  const getFilteredTodos = () => {
    if (!Array.isArray(todos)) return [];
    
    switch (currentView) {
      case "Today":
        const today = new Date().toLocaleDateString();
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const todoDate = new Date(todo.dueDate.split('/').reverse().join('-')).toLocaleDateString();
          return todoDate === today && !todo.isCompleted;
        });
      case "Upcoming":
        const todayDate = new Date();
        return todos.filter(todo => {
          if (!todo.dueDate || todo.isCompleted) return false;
          const todoDate = new Date(todo.dueDate.split('/').reverse().join('-'));
          return todoDate > todayDate;
        });
      case "Inbox":
      default:
        return todos.filter(todo => !todo.isCompleted);
    }
  };

  const filteredTodos = getFilteredTodos();
  console.log("Filtered Todos:", filteredTodos);
  return (
    <>
      <Sidebar
        toggleOnModalOpen={toggleOnModalOpen}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <Box ml={{ base: "0", md: "250px" }} p={{ base: "80px 50px", lg: "100px" }}>
        <Heading mb={4}>{currentView}</Heading>

        {/* Show skeletons if loading */}
        {isLoading && [...Array(3)].map((_, idx) => <TodoItemSkeleton key={idx} />)}

        {/* No todos */}
        {!isLoading && filteredTodos.length === 0 && (
          <Text fontSize="md" color="gray.600" textAlign="center">
            No todos to show in {currentView}.
          </Text>
        )}


        {/* Todos */}
        {!isLoading && filteredTodos
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
