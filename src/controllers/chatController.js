const { Chat } = require("../models/chatModels");

const createChat = async (req, res) => {
  try {
    const userId = req.user._id; // Get id of user to create a new chat, when create a new chat, that chat will have a id of the user who is chatting.
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

const updateChat = async (req, res) => {
  try {
    const updateChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { Message: req.body.message },
      { new: true }
    );
    res.json({
      updateChat,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getDetailChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(400).json({
        message: "No conversation with this user",
      });
    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// // function get all conversation
// const getConversation = async (req, res) => {
//   try {
//     const conversation = await Conversation.find({ chat: req.params.id }); // get all conversation by Id chat

//     if (!conversation)
//       return res.status(400).json({
//         message: "No conversation with this user",
//       });

//     res.json(conversation);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// function delete chat
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
  deleteChat,
  updateChat,
  getDetailChat,
};
