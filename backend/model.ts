const mongoose = require("mongoose");

//mongoose schema
const schema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

const Player = mongoose.model("Player", schema);
export default Player;
