const express = require("express");
const { verifyUser } = require('../middleware/authMiddleware');
const router = express.Router();

const todoRoutes = require("./todoRoutes");
const userRoutes = require("./userRoutes");
const appRoutes = require("./appRoutes");

// Public or protected routes
router.use("/api/users", userRoutes);
router.use("/api/users/:username/todo", verifyUser, todoRoutes);
router.use("/", appRoutes);

module.exports = router;