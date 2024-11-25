const mongoose = require("mongoose");

const Match = mongoose.Schema({
  team: String,
  games_played: Number,
  wins: Number,
  draws: Number,
  loss: Number,
  goals_for: Number,
  goals_against: Number,
  points: Number,
  year: Number,
});

module.exports = mongoose.model("Matches", Match);
