const express = require("express");
const auth = require("../middlewares/auth");
const getTodos = require("../controllers/todo/getTodos");
const addTodos = require("../controllers/todo/addTodo");

const todoRouter = express.Router();

todoRouter.get("/", auth, getTodos);
todoRouter.post("/add", auth, addTodos);
// todoRouter.post("/update/:id", updateTodo);
// todoRouter.post("/delete/:id", deleteTodo);

module.exports = todoRouter;
