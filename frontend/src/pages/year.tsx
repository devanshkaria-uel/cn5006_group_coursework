import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStatsForYear } from "../helpers/apis";
import loaderManager from "../helpers/loaderManager";

const GetTeamsByYear = () => {
  const [yearStat, setYearStat] = useState<any>({});

  const fetchdata = async () => {
    loaderManager.showLoader();
    var data = await fetchStatsForYear(year);
    setYearStat(data);
    loaderManager.hideLoader();
  };

  const [year, setYear] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-8 md:p-9 xl:p-10 overflow-clip">
      <div className="w-full h-full flex flex-col justify-center items-center overflow-clip">
        <div className="w-full flex flex-col gap-y-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-[10%] mx-20"
          >
            Back to home
          </button>
          <div className="w-full h-[50px] flex gap-x-5 mb-5 px-20">
            <input
              type="text"
              id="year"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 "
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <button
              onClick={() => {
                fetchdata();
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Get Stats for year
            </button>
          </div>
        </div>
        {year === "" ? (
          <div>Please enter year and search to show data</div>
        ) : (
          <div className="flex flex-col gap-y-8">
            <div className="flex gap-x-4">
              <h2 className="text-xl">Total Games Played:</h2>
              <p className="text-lg">{yearStat.totalGamesPlayed}</p>
            </div>
            <div className="flex gap-x-4">
              <h2 className="text-xl">Total Wins:</h2>
              <p className="text-lg">{yearStat.totalWins}</p>
            </div>
            <div className="flex gap-x-4">
              <h2 className="text-xl">Total Draws:</h2>
              <p className="text-lg">{yearStat.totalDraws}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTeamsByYear;
