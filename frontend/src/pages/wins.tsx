import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { match_fields, getTitle, MatchData } from "../helpers/helpers";
import { deleteTeamByID, fetchTopTeams } from "../helpers/apis";
import loaderManager from "../helpers/loaderManager";

const MinWinsTeams = () => {
  const deleteTeam = async (id: String) => {
    var data = await deleteTeamByID(id);
    fetchMatches();
  };

  const [match_data, setMatchData] = useState([]);

  const fetchMatches = async () => {
    setMatchData([]);
    loaderManager.showLoader();
    var data = await fetchTopTeams(minWins);
    console.log(data);
    setMatchData(data);
    loaderManager.hideLoader();
  };

  const [minWins, setMinWins] = useState("");

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
              id="teamName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 "
              placeholder="Min wins"
              value={minWins}
              onChange={(e) => setMinWins(e.target.value)}
            />
            <button
              onClick={() => {
                fetchMatches();
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Get teams by min wins
            </button>
          </div>
        </div>
        <div className="w-[90%] h-[70%] rounded-lg shadow-md">
          <div className="max-h-full overflow-scroll w-full rounded-md block bg-red">
            <table className="h-full w-full p-8 rounded-md">
              <thead className="h-[7%] bg-theme-accent/15 backdrop-blur-md text-left rounded-md sticky top-0">
                <tr>
                  {match_fields.map((element) => {
                    return (
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
                {match_data.map((data_elm: MatchData) => {
                  return match_data.length == 0 ? (
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

export default MinWinsTeams;
