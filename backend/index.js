require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 8080;

// ✅ CORS setup (configure allowed origins)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allows cookies/auth headers
  })
);

// ✅ MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

connectDB(process.env.MONGO_URI);

// ✅ Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server running on PORT:${port}`);
});

// ✅ Graceful shutdown
const shutdown = () => {
  console.log("🔴 Received kill signal, shutting down gracefully...");
  server.close(() => {
    console.log("✅ Closed out remaining connections.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
