import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "", // Add _id field to match MongoDB document structure
    name: "",
    email: "",
    password: "", // This will typically be omitted on the frontend for security reasons
    profilePic: "",
    accountType: [], // Array to hold account types
    todos: [], // Array of todo IDs
  },
  isAuthenticated: false, // Authentication flag
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Update user info
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Merge updated fields with existing user data
    },

    // Set user authenticated
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Boolean flag for authentication
    },

    // Add Todo to user's todos array
    addUserTodo: (state, action) => {
      if (!state.user.todos.includes(action.payload)) {
        state.user.todos.push(action.payload); // Add new todo ID if not already added
      }
    },

    // Remove Todo from user's todos array
    removeUserTodo: (state, action) => {
      state.user.todos = state.user.todos.filter(
        (todoId) => todoId !== action.payload
      ); // Filter out the todo by ID
    },
  },
});

export const { updateUser, setAuthenticated, addUserTodo, removeUserTodo } = userSlice.actions;
export default userSlice.reducer;
