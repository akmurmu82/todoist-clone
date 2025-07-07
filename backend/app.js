const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Todoist-clone Server" });
});

module.exports = app;
