import React, { useEffect, useState } from "react";
import { MatchData } from "../helpers/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTeamById } from "../helpers/apis";

const ViewTeam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [teamData, setTeamData] = useState<MatchData>({});

  const fetchTeamData = async () => {
    var data = await fetchTeamById(id!);
    setTeamData(data);
  };

  const navigate = useNavigate();
  const deleteTeam = () => {};

  useEffect(() => {
    fetchTeamData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-y-8">
        <div className="flex gap-x-4">
          <h2 className="text-xl">Team:</h2>
          <p className="text-lg">{teamData.team}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Games Played:</h2>
          <p className="text-lg">{teamData.games_played}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Win:</h2>
          <p className="text-lg">{teamData.win}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Loss:</h2>
          <p className="text-lg">{teamData.loss}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Draw:</h2>
          <p className="text-lg">{teamData.draw}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Goals for: </h2>
          <p className="text-lg">{teamData.goals_for}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Goals Against:</h2>
          <p className="text-lg">{teamData.goals_against}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Points:</h2>
          <p className="text-lg">{teamData.points}</p>
        </div>
        <div className="flex gap-x-4">
          <h2 className="text-xl">Year:</h2>
          <p className="text-lg">{teamData.year}</p>
        </div>
      </div>
      <div className="w-full h-[50px] flex gap-x-5 mb-5 px-20 justify-center items-center my-4">
        <button
          onClick={() => {
            navigate(`/`);
          }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Back to all teams
        </button>
        <button
          onClick={() => {
            navigate(`../edit?id=${id}`, { replace: true, relative: "route" });
          }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Edit team
        </button>
        <button
          onClick={() => {
            deleteTeam();
          }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Delete Team
        </button>
      </div>
    </div>
  );
};

export default ViewTeam;
