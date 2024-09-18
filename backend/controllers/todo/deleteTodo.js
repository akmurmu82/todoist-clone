const TodoModel = require("../../models/todoModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const deleteTodos = async (req, res) => {
  try {
    const { todoId } = req.params;

    const response = await TodoModel.findByIdAndDelete({ _id: todoId });

    if (!response) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }
    res.status(200).json({ status: true, data: "Todo deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error, message: "Error deleting Todo" });
  }
};

module.exports = deleteTodos;
