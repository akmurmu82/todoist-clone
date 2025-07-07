const app = require('./app');
const port = process.env.PORT || 8080;
const connectDB = require("./config/db");

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in the environment variables.");
  process.exit(1);  // Exit if the variable is not set
}

connectDB(process.env.MONGO_URI);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown (same as before)
const shutdown = () => {
  console.log("Received kill signal, shutting down gracefully...");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
