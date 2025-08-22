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
        const todayTodos = todos.filter(todo => {
          if (!todo.dueDate) return false;
          const todoDate = new Date(todo.dueDate.split('/').reverse().join('-')).toLocaleDateString();
          return todoDate === today;
        });
        return todayTodos;
      case "Upcoming":
        const todayDate = new Date();
        const upcomingTodos = todos.filter(todo => {
          if (!todo.dueDate) return false;
          const todoDate = new Date(todo.dueDate.split('/').reverse().join('-'));
          return todoDate > todayDate;
        });
        return upcomingTodos;
      case "Inbox":
      default:
        return todos;
    }
  };

  // Separate completed and incomplete todos
  const allFilteredTodos = getFilteredTodos();
  
  // Use a more robust filtering approach
  const incompleteTodos = allFilteredTodos.filter(todo => {
    return todo && typeof todo.isCompleted !== 'undefined' ? !todo.isCompleted : true;
  });
  
  const completedTodos = allFilteredTodos.filter(todo => {
    return todo && todo.isCompleted === true;
  });

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
        {!isLoading && allFilteredTodos.length === 0 && (
          <Text fontSize="md" color="gray.600" textAlign="center">
            No todos to show in {currentView}.
          </Text>
        )}

        {/* Incomplete Todos */}
        {!isLoading && incompleteTodos
            .filter((todo) => todo && todo._id) // skip null or invalid todos
            .map((todo) => (
              <TaskItem
                key={todo._id}
                todo={todo}
                toggleOnModalOpen={toggleOnModalOpen}
                isCompleted={false}
              />
            ))}

        {/* Completed Todos Section */}
        {!isLoading && completedTodos.length > 0 && (
          <>
            <Box mt={8} mb={4}>
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Completed ({completedTodos.length})
              </Text>
            </Box>
            {completedTodos
              .filter((todo) => todo && todo._id)
              .map((todo) => (
                <TaskItem
                  key={todo._id}
                  todo={todo}
                  toggleOnModalOpen={toggleOnModalOpen}
                  isCompleted={true}
                />
              ))}
          </>
        )}

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
