require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const morgan = require("morgan");

const port = process.env.PORT || 8080;

console.log(process.env.NODE_ENV)
// ✅ Logger middleware (works in dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
