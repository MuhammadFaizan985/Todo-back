const Todo = require("../models/Todo");
const { redisClient } = require("../config/redis");

const invalidateCache = async (username) => {
  await redisClient.del(`todos:${username}`);
};

const getAllTodos = async (username) => {
  const cacheKey = `todos:${username}`;

  try {
    // Check Redis
    const cachedTodos = await redisClient.get(cacheKey);
    if (cachedTodos) {
      console.log("Serving from Redis cache");
      return JSON.parse(cachedTodos);
    }
  } catch (error) {
    console.error("Redis get error:", error);
  }

  // Fetch from MongoDB
  console.log("Serving from MongoDB");
  const todos = await Todo.find({ username }).sort({ createdAt: -1 });

  try {
    // Save in Redis (cache for 1 hour)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(todos));
  } catch (error) {
    console.error("Redis set error:", error);
  }

  return todos;
}

const createTodo = async (todoName, todoDescription, username) => {
  const todo = await Todo.create({
    username,
    todoName,
    todoDescription
  })
  await invalidateCache(username);
  return todo;
}

const deleteTodo = async (todoId, username) => {
  const result = await Todo.deleteOne({
    username,
    _id: todoId,
  })
  if (result.deletedCount === 0) throw new Error("todo not find")

  await invalidateCache(username);
  return result.deletedCount;
}

const deleteAllTodos = async (username) => {
  const result = await Todo.deleteMany({
    username
  })

  await invalidateCache(username);
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

  await invalidateCache(username);
  return todo;
};

module.exports = { getAllTodos, getOneTodo, createTodo, deleteAllTodos, deleteTodo, updateTodoStatus }

// Alias for backward compatibility
module.exports.getTodo = module.exports.getOneTodo;
module.exports.deleteAllTodo = module.exports.deleteAllTodos;