import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

// ✅ Thunk for logging in the user
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BaseBackendURL}/users/login`, {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("todoistAuthToken", JSON.stringify(res.data.token));

      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("todoistAuthToken");
    },
    addUserTodo: (state, action) => {
      if (state.user && !state.user.todos.includes(action.payload)) {
        state.user.todos.push(action.payload);
      }
    },
    removeUserTodo: (state, action) => {
      if (state.user) {
        state.user.todos = state.user.todos.filter(
          (todoId) => todoId !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateUser,
  setAuthenticated,
  logoutUser,
  addUserTodo,
  removeUserTodo,
} = userSlice.actions;

export default userSlice.reducer;
