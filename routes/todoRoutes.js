const express = require('express');
const router = express.Router();
const {createTodoController,
  deleteTodoController,
  deleteAllTodoController,
  getTodoController,
  getAllTodoController,
  updateTodoStatusController} = require("../controllers/todoControllers")

  router.post("/" , createTodoController);
  router.delete("/:id" , deleteTodoController);
  router.delete("/" , deleteAllTodoController);
  router.get("/:id" , getTodoController);
  router.get("/" , getAllTodoController)
  router.get('/:id/status' , updateTodoStatusController)

  module.exports = router;