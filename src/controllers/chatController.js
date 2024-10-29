const { Chat } = require("../models/chatModels");
const { Conversation } = require("../models/conversationModel");

const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(400).json({
        message: "No chat with this user",
      });

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });

    if (!conversation)
      return res.status(400).json({
        message: "No conversation with this user",
      });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(400).json({
        message: "No chat with this user",
      });
    if (!chat.user || chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await chat.deleteOne();

    res.json({
      message: "Chat deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createChat,
  getAllChats,
  addConversation,
  getConversation,
  deleteChat,
};
