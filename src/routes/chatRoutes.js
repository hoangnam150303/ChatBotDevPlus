const express = require("express");
const { isAuth } = require("../middleWares/isAuth");
const {
  createChat,
  getAllChats,
  addConversation,
  getConversation,
  deleteChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);

module.exports = router;
