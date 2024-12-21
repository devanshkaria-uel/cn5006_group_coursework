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

const fetchTeamByID = async (req, res) => {
  try {
    console.log("This is triggered");
    const { id } = req.params;
    const match = await Match.findById(id);
    res.status(200).json({
      message: "Matches fetched",
      data: match,
    });
  } catch (e) {
    console.log(e);
  }
};

// Create match function (1.5)
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
    console.log(req.body);
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
    console.log("created match = " + match);
    res.status(200).json({
      message: "Match created",
      data: match,
    });
  } catch (e) {
    console.log(e);
  }
};

// Update match function (1.6)
const updateMatch = async (req, res) => {
  try {
    console.log("updating match");
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ message: "id query parameter is required" });
    }

    console.log("id is : " + id);
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
    console.log(req.body);
    const updatedData = await Match.findByIdAndUpdate(
      id,
      {
        team,
        games_played,
        win,
        draw,
        loss,
        goals_for,
        goals_against,
        points,
        year,
      },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({
      message: "Match updated",
      data: updatedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating record" });
  }
};

// Delete match function (1.7)
const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Match.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({
      message: "Team Deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting record" });
  }
};

// Get teams that for a year (1.8)
const getMatchforYear = async (req, res) => {
  try {
    const { year } = req.params;
    const results = await Match.aggregate([
      { $match: { year: parseInt(year) } },
      {
        $group: {
          _id: null,
          totalGamesPlayed: { $sum: "$gamesPlayed" },
          totalWins: { $sum: "$win" },
          totalDraws: { $sum: "$draw" },
        },
      },
    ]);
    res.status(200).json({
      message: "Matches by year fetched successfully",
      data: results[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving stats" });
  }
};

// top 10 records for teams with min wins (1.9)
const getminWinsTeams = async (req, res) => {
  try {
    const { minWins } = req.query;

    if (!minWins) {
      return res
        .status(400)
        .json({ message: "minWins query parameter is required" });
    }

    const results = await Match.find({
      win: { $gte: parseInt(minWins) },
    }).limit(10);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

// teams with min avg goals for a given year (2.0)
const getMinAvgGoalsForYear = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({
        message: "year query parameter is required",
      });
    }

    const [teams, avgGoals] = await Promise.all([
      Match.find({ year: parseInt(year) }),
      Match.aggregate([
        { $match: { year: parseInt(year) } },
        {
          $group: {
            _id: null,
            avgGoalsFor: { $avg: "$goals_for" },
          },
        },
      ]),
    ]);

    const avgGoalForYear =
      avgGoals.length > 0 ? Math.round(avgGoals[0].avgGoalsFor) : 0;

    res.status(200).json({
      message: "Teams fetched successfully",
      data: teams,
      avgGoalForYear: avgGoalForYear,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

router.post("/add/", createMatch);
router.post("/update/", updateMatch);
router.post("/delete/:id", deleteMatch);
router.get("/year/:year", getMatchforYear);
router.get("/wins/", getminWinsTeams);
router.get("/stats/", getMinAvgGoalsForYear);
router.get("/", fetchMatches);
router.get("/view/:id", fetchTeamByID);

module.exports = router;
