const TodoModel = require("../../models/todoModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const addTodos = async (req, res) => {
  try {
    const { title, description, dueDate, userId, priority } = req.body;
    console.log({ title, description, dueDate, userId, priority });
    // console.log("adding...");

    if (!title || !userId) {
      return res
        .status(400)
        .json({ status: false, message: "required fields are missing!" });
    }

    const existingTodos = await TodoModel.findOne({ title });
    if (existingTodos) {
      return res
        .status(409)
        .json({ status: false, message: "Todo already exists!" });
    }

    const newTodo = new TodoModel({
      title,
      description,
      userId,
      priority,
      dueDate,
    });

    await newTodo.save();

    res.status(201).json({
      status: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, error, message: "Internal server error" });
  }
};

module.exports = addTodos;
