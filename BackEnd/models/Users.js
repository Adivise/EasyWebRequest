const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    twitchUsername: {
      type: String,
      trim: true,
      required: true,
    },
    twitchID: {
      type: String,
    },
    image: {
      type: String,
      public_id: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;