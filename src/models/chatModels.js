const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Message: {
      type: String,
      default: " ",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", schema);
module.exports = { Chat };
