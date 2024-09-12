// import packages
const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
require("dotenv").config();

// Environmental variable
const mongo_uri = process.env.MONGO_URI; // setup the mongoURI first
// console.log(mongo_uri)
const port = process.env.PORT;

// intialising server/app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);

// main route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Server" });
});

// listening server
app.listen(port, async () => {
  try {
    await connection(mongo_uri);
    console.log(`listening on port ${port} and connected to db`);
  } catch (error) {
    console.log(error);
  }
});
