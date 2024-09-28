const TodoModel = require("../../models/todoModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const updateTodos = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description, dueDate, priority, isCompleted } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (dueDate) updateData.dueDate = dueDate;
    if (isCompleted) updateData.isCompleted = isCompleted;
    if (priority) updateData.priority = priority;

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id: todoId },
      { ...updateData },
      { new: true } // This option ensures the updated document is returned
    );

    if (!updatedTodo) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }
    res.status(200).json({ status: true, data: updatedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error, message: "Error updating Todo" });
  }
};

module.exports = updateTodos;
