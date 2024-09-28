import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // The todo schema could include fields like:
    {
      _id: "", // Todo ID
      title: "", // Title of the task
      description: "", // Task description
      dueDate: "", // Date when the task is due
      priority: "", // Task priority (e.g., low, medium, high)
      completed: false, // Boolean to track if the task is completed
    },
  ],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add todo
    addTodo: (state, action) => {
      const todoExists = state.todos.find(
        (todo) => todo._id === action.payload._id
      );
      if (!todoExists) {
        state.todos.push(action.payload); // Add new todo if it doesn't exist
      }
    },

    // Update todo
    updateTodo: (state, action) => {
      const { currTodoId, newTodo } = action.payload;
      console.log("updating...", currTodoId, newTodo); // here is the problem
      const todoIndex = state.todos.findIndex((todo) => todo._id === currTodoId);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...newTodo }; // Update the todo by merging new data
      }
    },

    // Delete todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },

    // Load todo
    loadTodo: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, loadTodo } = todoSlice.actions;
export default todoSlice.reducer;
