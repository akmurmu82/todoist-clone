const TodoModel = require("../../models/todoModel");

const getTodos = async (req, res) => {
  const { userId, role } = req.user;

  const query = role === "admin" ? {} : { userId };

  try {
    const todos = await TodoModel.find(query).populate("userId");

    if (todos.length === 0) {
      return res.status(204).json({ status: true, data: [] });
    }

    res.status(200).json({ status: true, data: todos });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Error fetching todos", error: error.message });
  }
};

module.exports = getTodos;
