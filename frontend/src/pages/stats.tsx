import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { match_fields, getTitle, MatchData } from "../helpers/helpers";
import { fetchTeamsWithAvgGoals } from "../helpers/apis";

const GetTeamsForYearWithAverageGoals = () => {
  const [year, setYear] = useState("");
  const [matchData, setMatchdata] = useState([]);
  const [avgGoals, setAvgGoals] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    var data = await fetchTeamsWithAvgGoals(year);
    setMatchdata(data.data);
    setAvgGoals(data.avgGoalForYear);
  };

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
          <div className="flex justify-between px-20">
            <div className="w-full h-[50px] flex gap-x-5 mb-5">
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
                  fetchData();
                }}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Get Avg score for for year
              </button>
            </div>
            <div className="flex max-w-[10vw] w-[20%] items-center gap-x-4">
              <h3 className="text-lg">Average goals :</h3>
              <h3 className="text-4xl font-bold">{avgGoals}</h3>
            </div>
          </div>
        </div>
        <div className="w-[90%] h-[70%] rounded-lg shadow-md">
          <div className="max-h-full overflow-scroll w-full rounded-md block bg-red">
            <table className="h-full w-full p-8 rounded-md">
              <thead className="h-[7%] bg-theme-accent/15 backdrop-blur-md text-left rounded-md sticky top-0">
                <tr>
                  {match_fields.map((element) => {
                    return element === "action" ? null : (
                      <th
                        key={element}
                        scope="col"
                        className="py-4 px-6 font-montserrat_bold"
                      >
                        {getTitle(element)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="overflow-y-scroll max-h-[70vh] w-full h-full">
                {matchData.map((data_elm: MatchData) => {
                  return matchData.length == 0 ? (
                    <div className="flex items-center justify-center">
                      Please enter Min wins and click button to fetch data
                    </div>
                  ) : (
                    <tr className="odd:bg-white/5 w-full even:bg-theme-background1/60 border-b hover:bg-theme-accent/5 text-body1-mobile md:text-body1-tablet xl:text-body1-desktop">
                      {match_fields.map((field_elm: string) => {
                        return (
                          <td
                            scope="row"
                            key={data_elm._id}
                            className={
                              field_elm === "team"
                                ? "px-6 py-4 font-montserrat_bold whitespace-nowrap"
                                : "px-6 py-4"
                            }
                          >
                            {data_elm[field_elm as keyof MatchData]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTeamsForYearWithAverageGoals;
