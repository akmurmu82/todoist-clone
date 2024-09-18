const TodoModel = require("../models/todoModel");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const verifyUser = async (req, res, next) => {
  const { todoId } = req.params;
  const { userId } = req.body;
  // console.log("todoId:", todoId, "userId:", userId, "req.body:", req.body);
  try {
    // if (!todoId) {
    //   res.status(500).json({ status: false, message: "Todo ID is required" });
    // }
    const todo = await TodoModel.findOne(
      { _id: todoId },
      { userId: 1, title: 1 }
    );
    // console.log(todo, todo.userId.toString(), userId);
    if (todo.userId.toString() === userId) {
      return next();
    }
    res.status(403).json({ status: false, message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error fetching todos" });
  }
};

module.exports = verifyUser;
