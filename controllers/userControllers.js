const cookieParser = require("cookie-parser")
const userServices = require("../services/userServices")

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({
        isStatus: false,
        msg: "Please provide all required fields",
        data: null,
      });
    }
    const result = await userServices.createUser(email, username, password);
    res
      .status(201)
      .json({
        isStatus: true,
        msg: "User created successfully",
        data: result,
      });
  } catch (error) {
    if (error.message === "User already exist") {
      return res
        .status(409)
        .json({ isStatus: false, msg: error.message, data: null });
    }
    res
      .status(500)
      .json({
        isStatus: false,
        msg: error.message || "Internal Server Error",
        data: null,
      });
  }
};

const getUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({
          isStatus: false,
          msg: "Please provide email and password",
          data: null,
        });
    const result = await userServices.getUser(email, password);

    // Set HTTP-only cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      // If in production (HTTPS), use Secure. In dev (HTTP), do not.
      secure: process.env.NODE_ENV === "production",

      // FIX: dynamic sameSite. 'Lax' allows localhost cookies. 'None' is for cross-site prod.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({ isStatus: true, msg: "Login successfully", data: { user: result.user, token: result.token } });
  } catch (error) {
    if (error.message === "User not found") {
      return res
        .status(404)
        .json({ isStatus: false, msg: error.message, data: null });
    }
    if (error.message === "Username or Password is invalid") {
      return res
        .status(401)
        .json({ isStatus: false, msg: error.message, data: null });
    }
    res
      .status(500)
      .json({
        isStatus: false,
        msg: error.message || "Internal Server Error",
        data: null,
      });
  }
};

const logoutController = (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ isStatus: true, msg: "Logged out successfully", data: null });
};


const getProfileController = (req, res) => {

  res.status(200).json({
    isStatus: true,
    msg: "User is authenticated",
    data: req.user
  });
};


module.exports = { getProfileController, getUserController, createUserController, logoutController }