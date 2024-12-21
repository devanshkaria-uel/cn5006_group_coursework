const mongoose = require("mongoose");

const Match = mongoose.Schema({
  team: String,
  games_played: Number,
  win: Number,
  draw: Number,
  loss: Number,
  goals_for: Number,
  goals_against: Number,
  points: Number,
  year: Number,
});

module.exports = mongoose.model("Matches", Match);
