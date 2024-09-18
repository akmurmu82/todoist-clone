const express = require("express");
const auth = require("../middlewares/auth");
const getTodos = require("../controllers/todo/getTodos");
const addTodos = require("../controllers/todo/addTodo");
const updateTodos = require("../controllers/todo/updateTodo");
const verifyUser = require("../middlewares/verifyUser");
const deleteTodos = require("../controllers/todo/deleteTodo");

const todoRouter = express.Router();

todoRouter.get("/", auth, getTodos);
todoRouter.post("/add", auth, addTodos);
todoRouter.patch("/update/:todoId", auth, verifyUser, updateTodos);
todoRouter.delete("/delete/:todoId", auth, verifyUser, deleteTodos);

module.exports = todoRouter;
