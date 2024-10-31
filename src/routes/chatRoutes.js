const express = require("express");
const { isAuth } = require("../middleWares/isAuth");
const {
  createChat,
  getAllChats,

  deleteChat,
  getDetailChat,
  updateChat,
} = require("../controllers/chatController");
2
const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.get("/detailChat/:id", isAuth, getDetailChat);
router.put("/:id", isAuth, updateChat);
router.delete("/:id", isAuth, deleteChat);

module.exports = router;
