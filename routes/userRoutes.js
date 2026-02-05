const express = require('express');
const router = express.Router();
const {
    getProfileController, getUserController, createUserController, logoutController
} = require("../controllers/userControllers");
const { verifyUser } = require('../middleware/authMiddleware');


router.post("/signup", createUserController);
router.post("/login", getUserController);
router.get("/me", verifyUser, getProfileController);
router.get("/logout", verifyUser, logoutController);

module.exports = router;