const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/userModels");
dotenv.config();
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token)
      return res.status(403).json({
        isAuth: false,
        message: "Please login",
      });

    const decode = jwt.verify(token, process.env.Jwt_sec);
    req.user = await User.findById(decode._id);
    if (!req.user) {
      return res.status(403).json({
        isAuth: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      isAuth: false,
      message: "Login first",
    });
  }
};

module.exports = {
  isAuth,
};
