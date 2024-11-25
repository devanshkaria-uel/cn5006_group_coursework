const express = require("express");
const router = express.Router();
const Match = require("../models/MatchSchema");
// Create match function
const createMatch = async (req, res) => {
  try {
    const {
      team,
      games_played,
      win,
      draw,
      loss,
      goals_for,
      goals_against,
      points,
      year,
    } = req.body;
    const match = await Match.create({
      team,
      games_played,
      win,
      draw,
      loss,
      goals_for,
      goals_against,
      points,
      year,
    });
    res.status(200).json({
      message: "Match created",
      data: match,
    });
  } catch (e) {
    console.log(e);
  }
};

router.post("/", createMatch);

module.exports = router;
