import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------
// BASE SETUP
// ----------------------
const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL; // Replace with your actual backend URL
const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

// ----------------------
// ASYNC THUNKS
// ----------------------

// 1. Fetch All Todos
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";
      const res = await axios.get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Create Todo
export const createTodoAsync = createAsyncThunk(
  "todos/createTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      let res = await axios.post(
        `${BASE_URL}/todos/add`,
        todoData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Update Todo
// todoSlice.js

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, updatedData }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";

      const res = await axios.patch(
        `${BASE_URL}/todos/update/${todoId}`,
        updatedData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { todoId, updatedTodo: res.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 4. Delete Todo
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (_id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("todoistAuthToken")) || "";
      await axios.delete(`${BASE_URL}/todos/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return _id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ----------------------
// SLICE
// ----------------------
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todoExists = state.todos.find(todo => todo._id === action.payload._id);
      if (!todoExists) {
        state.todos.push(action.payload);
      }
    },
    updateTodo: (state, action) => {
      const { currTodoId, newTodo } = action.payload;
      const index = state.todos.findIndex(todo => todo._id === currTodoId);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...newTodo };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
    loadTodo: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodosAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Todo
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        if (!Array.isArray(state.todos)) {
          state.todos = [];
        }
        state.todos.push(action.payload);
      })

      // Update Todo
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
  const { todoId, updatedTodo } = action.payload;
  const index = state.todos.findIndex((todo) => todo._id === todoId);
  if (index !== -1) {
    state.todos[index] = updatedTodo;
  }
})

      // Delete Todo
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      });
  },
});

// ----------------------
// EXPORTS
// ----------------------

export const { addTodo, updateTodo, deleteTodo, loadTodo } = todoSlice.actions;
export default todoSlice.reducer;

