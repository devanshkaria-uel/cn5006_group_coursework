const express = require("express");
const router = express.Router();
const Match = require("../models/MatchSchema");

const fetchMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json({
      message: "Matches fetched",
      data: matches,
    });
  } catch (e) {
    console.log(e);
  }
};

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
router.get("/", fetchMatches);

module.exports = router;
