import { Box, HStack, Text, useDisclosure, Heading, Flex, ButtonSpinner } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

import Sidebar from "../sidebar/Sidebar";
import TaskItem from "./Task";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadTodo } from "../../redux/slices/todoSlice";
import AddTodoModal from "./AddTodoModal";
import TodoItemSkeleton from "./TodoItemSkeleton";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { todos } = useSelector((state) => state.todos);
  console.log("todos:", todos);
  const [isTodosLoading, setIsTodosLoading] = useState(false)
  const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";
  const [currTodoId, setCurrTodoId] = useState(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  function toggleOnModalOpen(todoId) {
    if (typeof todoId === "string") {
      setCurrTodoId(todoId);
    } else {
      setCurrTodoId(null);
    }
    onModalOpen();
    onClose();
  }

  // Fetching Todos
  const fetchTodos = async () => {
    try {
      setIsTodosLoading(true)
      let res = await axios.get(`${BaseBackendURL}/todos`, {
        body: { _id: user._id },

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.status) {
        // console.log(res.data.data);
        dispatch(loadTodo(res.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTodosLoading(false)
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

        {/* Loading Indicator */}
        {/* Skeletons while loading */}
        {isTodosLoading && (
          <>
            {[...Array(3)].map((_, idx) => (
              <TodoItemSkeleton key={idx} />
            ))}
          </>
        )}

        {/* If no todos */}
        {!isTodosLoading && todos.length === 0 && (
          <Text fontSize="md" color="gray.600" textAlign="center">
            No todos to show.
          </Text>
        )}

        {/* Todos List */}
        {!isTodosLoading &&
          todos.map(({ _id, title, description, isCompleted, priority }) => (
            <TaskItem
              key={_id}
              todoId={_id}
              title={title}
              description={description}
              isCompleted={isCompleted}
              priority={priority}
              toggleOnModalOpen={toggleOnModalOpen}
            />
          ))}
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
