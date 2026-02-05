const Todo = require("../models/Todo")

const getAllTodos = async (username) => {
  const todos = await Todo.find({ username }).sort({ createdAt: -1 })
  return (todos)
}

const createTodo = async (todoName, todoDescription, username) => {
  const todo = await Todo.create({
    username,
    todoName,
    todoDescription
  })
  return todo;
}

const deleteTodo = async (todoId, username) => {
  const result = await Todo.deleteOne({
    username,
    _id: todoId,
  })
  if (result.deletedCount === 0) throw new Error("todo not find")


  return result.deletedCount;
}

const deleteAllTodos = async (username) => {
  const result = await Todo.deleteMany({
    username
  })


  return result.deletedCount;
}

const getOneTodo = async (id, username) => {
  const todo = await Todo.findOne({
    username,
    _id: id,
  })
  if (!todo) throw new Error("todo not find")


  return todo;
}

const updateTodoStatus = async (id, username) => {
  const existingTodo = await Todo.findOne({ _id: id, username });
  if (!existingTodo) throw new Error("Todo not found");

  const todo = await Todo.findOneAndUpdate(
    { _id: id, username },
    { isDone: !existingTodo.isDone },
    { new: true },
  );
  if (!todo) throw new Error("Todo not found");
  return todo;
};

module.exports = { getAllTodos, getOneTodo, createTodo, deleteAllTodos, deleteTodo, updateTodoStatus }

// Alias for backward compatibility
module.exports.getTodo = module.exports.getOneTodo;
module.exports.deleteAllTodo = module.exports.deleteAllTodos;