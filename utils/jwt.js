const jwt = require("jsonwebtoken");

const SECRET_KEY= process.env.SECRET_KeY;

const signToken = (payload) => {
        return jwt.sign(payload, SECRET_KEY, {expiresIn:"1d" })
}

const verifyToken = (token) => {
        return jwt.verify(token , SECRET_KEY)
}

module.exports = {signToken, verifyToken}