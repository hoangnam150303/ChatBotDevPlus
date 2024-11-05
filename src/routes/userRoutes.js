const express = require("express");
const router = express.Router();
const {
  loginUser,
  verifyUser,
  myProfile,
} = require("../controllers/userController");
const { isAuth } = require("../middleWares/isAuth");

router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);


module.exports = router;
