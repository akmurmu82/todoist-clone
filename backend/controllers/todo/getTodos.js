const TodoModel = require("../../models/todoModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const getTodos = async (req, res) => {
  const { userId, role } = req.body;

  const query = role === "admin" ? {} : { userId };
  try {
    const todos = await TodoModel.find(query).populate("userId");
    if (todos.length === 0) {
      res.status(200).json({ status: true, message: "No todo found" });
    }

    res.status(200).json({ status: true, data: todos });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, error, message: "Error fetching todos" });
  }
};

module.exports = getTodos;
