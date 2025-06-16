const TodoModel = require("../models/todoModel");
require("dotenv").config();

const verifyUser = async (req, res, next) => {
  const { todoId } = req.params;
  const { userId, role } = req.user;

  try {
    const todo = await TodoModel.findById(todoId).select("userId title");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId.toString() === userId || role === "admin") {
      return next();
    }

    return res.status(403).json({ status: false, message: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Error verifying user" });
  }
};

module.exports = verifyUser;
