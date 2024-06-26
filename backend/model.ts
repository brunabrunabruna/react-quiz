const mongoose = require("mongoose");

//mongoose schema. Defines a strict model for my data
const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

//by default, mongoose uses the "Player" name  (pluralized and lowercased), to search for this collection on the db
const Player = mongoose.model("Player", playerSchema);
export default Player;
