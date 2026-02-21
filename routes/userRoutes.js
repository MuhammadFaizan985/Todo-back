const express = require('express');
const router = express.Router();
const {
    getProfileController, getUserController, createUserController, logoutController
} = require("../controllers/userControllers");
const { verifyUser } = require('../middleware/authMiddleware');


const { upload } = require('../config/cloudinary');


router.post("/signup", upload.single('profilePicture'), createUserController);
router.post("/login", getUserController);
router.get("/me", verifyUser, getProfileController);
router.get("/logout", verifyUser, logoutController);

module.exports = router;