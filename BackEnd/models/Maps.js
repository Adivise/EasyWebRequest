const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapsSchema = new Schema(
  {
    mapInfo: {
      type: Array,
    },
    twitchUsername: {
      type: String,
      trim: true,
      required: true,
    },
    mods: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Map = mongoose.model("map", mapsSchema);

module.exports = Map;