import React, { useState } from "react";
import loaderManager from "../helpers/loaderManager";
import { addMatch } from "../helpers/apis";
import { MatchData } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";

const AddTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [win, setWins] = useState("");
  const [loss, setLoss] = useState("");
  const [draw, setDraw] = useState("");
  const [goalsFor, setGoalsFor] = useState("");
  const [goalsAgainst, setGoalsAgainst] = useState("");
  const [year, setYear] = useState("");
  const [points, setPoints] = useState("");
  const [games_played, setgamesPlayed] = useState("");

  const navigate = useNavigate();

  const addTeam = async () => {
    loaderManager.showLoader();
    var result = await addMatch(
      JSON.stringify({
        team: teamName,
        games_played: parseInt(games_played),
        win: parseInt(win),
        draw: parseInt(draw),
        loss: parseInt(loss),
        goals_for: parseInt(goalsFor),
        goals_against: parseInt(goalsAgainst),
        points: parseInt(points),
        year: parseInt(year),
      })
    );
    loaderManager.hideLoader();
    if (result.message === "Match created") {
      navigate("/");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Team
            </label>
            <input
              type="text"
              id="teamName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Games Played
            </label>
            <input
              type="number"
              id="games_played"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Games Played"
              value={games_played}
              onChange={(e) => setgamesPlayed(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Wins
            </label>
            <input
              type="number"
              id="win"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Wins"
              value={win}
              onChange={(e) => setWins(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Losses
            </label>
            <input
              id="loss"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Losses"
              value={loss}
              onChange={(e) => setLoss(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Draws
            </label>
            <input
              id="draw"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Draws"
              value={draw}
              onChange={(e) => setDraw(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Goals for
            </label>
            <input
              type="number"
              id="goalsFor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Goals for"
              value={goalsFor}
              onChange={(e) => setGoalsFor(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Goals Against
            </label>
            <input
              type="number"
              id="goalsAgainst"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="goalsAgainst"
              value={goalsAgainst}
              onChange={(e) => setGoalsAgainst(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Points
          </label>
          <input
            id="points"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Year
          </label>
          <input
            id="year"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div
          onClick={addTeam}
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Team
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
