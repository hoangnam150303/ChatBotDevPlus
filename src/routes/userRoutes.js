const express = require("express");
const router = express.Router();
const {
  loginUser,
  verifyUser,
  myProfile,
  getLoginPage,
  getVerifyPage,
  getHomePage,
} = require("../controllers/userController");
const { isAuth } = require("../middleWares/isAuth");

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);
router.get("/loginPage", getLoginPage);
router.get("/verifyPage", getVerifyPage);
router.get("/homePage", getHomePage);

module.exports = router;
