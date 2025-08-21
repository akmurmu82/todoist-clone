const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
console.log("Client URL:", process.env.CLIENT_URL);

// ✅ CORS setup (configure allowed origins)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Updated default port for Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allows cookies/auth headers
  })
);

// ✅ Disable COOP/COEP so postMessage works with Google OAuth
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

app.use("/api/auth", userRouter);
app.use("/api/todos", todoRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todoist-clone Server" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
