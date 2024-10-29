const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);
module.exports = { User };
