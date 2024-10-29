const { sendMail } = require("../middleWares/sendMail");
const { User } = require("../models/UserModels");
const jwt = require("jsonwebtoken");

// Login method
const loginUser = async (req, res) => {
  try {
    const { email } = req.body; // take the data from view

    let user = await User.findOne({ email }); // find user by email

    if (!user) {
      // if email is not define in database, create new account for user
      user = await User.create({
        email,
      });
    }

    const otp = Math.floor(Math.random() * 9999); // random otp by Math.floor
    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      // verifytoken
      expiresIn: "10m",
    });

    await sendMail(email, "ChatBot", otp); // call method sendMail and put 3 parametors
    res.json({
      success: true,
      message: "OTP send to your mail",
      userId: user._id,
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify user when user input otp in the field
const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    console.log(typeof otp);
    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    if (!verify) {
      return res.status(400).json({
        isAuth: false,
        message: "OTP Expired",
      });
    }
    console.log(verify.otp == otp);
    console.log("verify otp", verify.otp);
    console.log("otp", otp);
    if (verify.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        message: "Wrong otp",
        isAuth: false,
      });
    }
    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      isAuth: true,
      success: true,
      message: "Logged in succesfully!",
      user: verify.user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
    res;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLoginPage = (req, res) => {
  res.render("login.ejs");
};

const getVerifyPage = (req, res) => {
  // const { token } = req.query;
  res.render("verify.ejs");
};

const getHomePage = (req, res) => {
  res.render("home.ejs");
};

module.exports = {
  loginUser,
  verifyUser,
  myProfile,
  getLoginPage,
  getVerifyPage,
  getHomePage,
};
