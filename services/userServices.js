const bcrypt = require("bcrypt")
const { signToken } = require("../utils/jwt")
const User = require("../models/User")


const getUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password")
    if (!user) throw new Error("User not found")
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Username or Password is invalid")

    const token = signToken({
        username: user.username,
        email: user.email,
        id: user._id
    })
    return ({
        token, user: {
            username: user.username,
            email: user.email,
            id: user._id,
            profilePicture: user.profilePicture
        }
    })
}

const createUser = async (email, username, password, profilePicture) => {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) throw new Error("User already exist")

    const hashPassword = await bcrypt.hash(password, 10)
    const userData = {
        username,
        email,
        password: hashPassword
    };

    if (profilePicture) {
        userData.profilePicture = profilePicture;
    }

    const user = await User.create(userData);

    // Generate token for auto-login
    const token = signToken({
        username: user.username,
        email: user.email,
        id: user._id
    })

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
}

const getProfile = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return {
        username: user.username,
        email: user.email,
        id: user._id,
        profilePicture: user.profilePicture
    };
}

module.exports = { createUser, getUser, getProfile }