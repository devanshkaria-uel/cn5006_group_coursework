import React, { useEffect, useState } from "react";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import { fetchTeamById, updateMatch } from "../helpers/apis";
import { MatchData } from "../helpers/helpers";
import loaderManager from "../helpers/loaderManager";

const EditTeam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [teamData, setTeamData] = useState<MatchData>({});

  const [teamName, setTeamName] = useState("");
  const [wins, setWins] = useState("");
  const [loss, setLoss] = useState("");
  const [draw, setDraw] = useState("");
  const [goalsFor, setGoalsFor] = useState("");
  const [goalsAgainst, setGoalsAgainst] = useState("");
  const [year, setYear] = useState("");
  const [points, setPoints] = useState("");
  const [games_played, setgamesPlayed] = useState("");

  const fetchTeamData = async () => {
    var data = await fetchTeamById(id!);
    setTeamData(data);
    setTeamName(data.team);
    setWins(data.win);
    setDraw(data.draw);
    setLoss(data.loss);
    setGoalsFor(data.goals_for);
    setGoalsAgainst(data.goals_against);
    setYear(data.year);
    setPoints(data.points);
    setgamesPlayed(data.games_played);
  };

  const navigate = useNavigate();

  const editTeam = async () => {
    var result = await updateMatch(id!, {
      team: teamName,
      games_played: parseInt(games_played),
      win: parseInt(wins),
      draw: parseInt(draw),
      loss: parseInt(loss),
      goals_for: parseInt(goalsFor),
      goals_against: parseInt(goalsAgainst),
      points: parseInt(points),
      year: parseInt(year),
    });
    console.log(result);
    if (result.message === "Match updated") {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center p-10">
      <div className="flex flex-col gap-y-8">
        <button
          onClick={() => {
            navigate(`/`);
          }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Back to all teams
        </button>
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
                value={wins}
                onChange={(e) => setWins(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Losses
              </label>
              <input
                type="number"
                id="loss"
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
                type="number"
                id="draw"
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
            onClick={editTeam}
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Team
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
