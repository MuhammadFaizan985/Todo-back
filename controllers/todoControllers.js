  const mongoose = require("mongoose");
const todoServices = require("../services/todoServices");

// Helper to validate MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


const createTodoController = async (req, res) => {
  try {
    const { todoName, todoDescription, } = req.body;
    const username = req.user?.username;

    if (!username)
      return res
        .status(401)
        .json({ isStatus: false, msg: "Unauthorized", data: null });

    if (!todoName || typeof todoName !== "string")
      return res
        .status(400)
        .json({ isStatus: false, msg: "Title is required", data: null });

    const createdTodo = await todoServices.createTodo(
      todoName,
      todoDescription,
      username
    );

    res
      .status(201)
      .json({ isStatus: true, msg: "Todo created successfully", data: createdTodo });
  } catch (error) {
    res
      .status(500)
      .json({ isStatus: false, msg: error.message, data: null });
  }
};

// --- Delete a single Todo ---
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.user?.username;

    if (!isValidId(id))
      return res
        .status(400)
        .json({ isStatus: false, msg: "Invalid Id", data: null });

    const deletedCount = await todoServices.deleteTodo(id, username);

    res.status(200).json({
      isStatus: true,
      msg: "Todo deleted successfully",
      data: deletedCount,
    });
  } catch (error) {
    res.status(500).json({ isStatus: false, msg: error.message, data: null });
  }
};

// --- Delete all Todos for a user ---
const deleteAllTodoController = async (req, res) => {
  try {
    const username = req.user?.username;

    const deletedCount = await todoServices.deleteAllTodo(username);
    res.status(200).json({
      isStatus: true,
      msg: `${deletedCount} todos deleted successfully`,
      data: deletedCount,
    });
  } catch (error) {
    res.status(500).json({ isStatus: false, msg: error.message, data: null });
  }
};



// --- Update Todo status ---
const updateTodoStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.user?.username;

    if (!isValidId(id))
      return res
        .status(400)
        .json({ isStatus: false, msg: "Invalid Id", data: null });

    const updatedTodo = await todoServices.updateTodoStatus(id, username);

    res.status(200).json({
      isStatus: true,
      msg: "Todo status updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ isStatus: false, msg: error.message, data: null });
  }
};

// --- Get a specific Todo ---
const getTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.user?.username;

    if (!isValidId(id))
      return res
        .status(400)
        .json({ isStatus: false, msg: "Invalid Id", data: null });

    const todo = await todoServices.getTodo(id, username);
    res.status(200).json({ isStatus: true, msg: "Todo fetched successfully", data: todo });
  } catch (error) {
    res.status(500).json({ isStatus: false, msg: error.message, data: null });
  }
};

// --- Get all Todos for a user ---
const getAllTodoController = async (req, res) => {
  try {
    const username = req.user?.username;

    const allTodos = await todoServices.getAllTodos(username);
    res
      .status(200)
      .json({ isStatus: true, msg: "All todos fetched successfully", data: allTodos });
  } catch (error) {
    res.status(500).json({ isStatus: false, msg: error.message, data: null });
  }
};

module.exports = {
  createTodoController,
  deleteTodoController,
  deleteAllTodoController,
  getTodoController,
  getAllTodoController,
  updateTodoStatusController,
};