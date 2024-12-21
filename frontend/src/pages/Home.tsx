import axios from "axios";
import React, { useEffect, useState } from "react";
import { MatchData, match_fields, getTitle } from "../helpers/helpers";
import { deleteTeamByID, fetchData } from "../helpers/apis";
import { Navigate, useNavigate } from "react-router-dom";
import loaderManager from "../helpers/loaderManager";

const Home = () => {
  const [match_data, setMatchData] = useState<MatchData[]>([]);
  const [stats, setStats] = useState({});
  const [avgGoals, setAvgGoals] = useState({});
  const [topTeams, setTopTeams] = useState({});

  const navigate = useNavigate();

  const deleteTeam = async (id: String) => {
    var data = await deleteTeamByID(id);
    fetchMatches();
  };

  // 1.5
  const fetchMatches = async () => {
    setMatchData([]);
    loaderManager.showLoader();
    var data = await fetchData();
    setMatchData(data);
    loaderManager.hideLoader();
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="h-full w-full p-8 md:p-9 xl:p-10 overflow-clip">
      <div className="w-full h-full flex flex-col justify-center items-center overflow-clip">
        <div className="w-full h-[50px] flex gap-x-5 mb-5 px-20">
          <button
            onClick={() => {
              navigate("/add");
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Add team
          </button>
          <button
            onClick={() => {
              navigate("/year");
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Show stats by year
          </button>
          <button
            onClick={() => {
              navigate("/wins");
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Get Teams by min wins
          </button>
          <button
            onClick={() => {
              navigate("/stats");
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Get Teams by year with avg goals for year
          </button>
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
                  return (
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
                            {field_elm === "actions" ? (
                              <div className="flex gap-x-4">
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    navigate(`view?id=${data_elm._id}`);
                                  }}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="20"
                                      height="20"
                                      rx="3"
                                      fill="#A0DEFF"
                                    />
                                    <path
                                      d="M5 10C5 10 6.5 6.5 10 6.5C13.5 6.5 15 10 15 10C15 10 13.5 13.5 10 13.5C6.5 13.5 5 10 5 10Z"
                                      stroke="#2BA4DD"
                                      stroke-width="0.6"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M10 11.5C10.8284 11.5 11.5 10.8284 11.5 10C11.5 9.17157 10.8284 8.5 10 8.5C9.17157 8.5 8.5 9.17157 8.5 10C8.5 10.8284 9.17157 11.5 10 11.5Z"
                                      stroke="#2BA4DD"
                                      stroke-width="0.6"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    navigate(`edit?id=${data_elm._id}`);
                                  }}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      opacity="0.6"
                                      width="20"
                                      height="20"
                                      rx="3"
                                      fill="#F6E96B"
                                    />
                                    <g clip-path="url(#clip0_212_256)">
                                      <path
                                        d="M14.587 7.40595C14.8513 7.14166 14.9999 6.78318 14.9999 6.40937C15 6.03557 14.8515 5.67705 14.5872 5.4127C14.3229 5.14834 13.9645 4.9998 13.5906 4.99976C13.2168 4.99971 12.8583 5.14816 12.594 5.41245L5.92097 12.0869C5.80488 12.2027 5.71902 12.3452 5.67097 12.5019L5.01047 14.6779C4.99754 14.7212 4.99657 14.7671 5.00764 14.8109C5.01872 14.8546 5.04143 14.8946 5.07337 14.9264C5.1053 14.9583 5.14528 14.981 5.18905 14.992C5.23282 15.003 5.27875 15.0019 5.32197 14.9889L7.49847 14.3289C7.65505 14.2813 7.79755 14.196 7.91347 14.0804L14.587 7.40595Z"
                                        stroke="#191919"
                                        stroke-width="0.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_212_256">
                                        <rect
                                          width="12"
                                          height="12"
                                          fill="white"
                                          transform="translate(4 4)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    deleteTeam(data_elm._id);
                                  }}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      opacity="0.43"
                                      width="20"
                                      height="20"
                                      rx="3"
                                      fill="#FF6969"
                                    />
                                    <path
                                      d="M5.5 7H14.5M13.5 7V14C13.5 14.5 13 15 12.5 15H7.5C7 15 6.5 14.5 6.5 14V7M8 7V6C8 5.5 8.5 5 9 5H11C11.5 5 12 5.5 12 6V7M9 9.5V12.5M11 9.5V12.5"
                                      stroke="#FF6969"
                                      stroke-width="0.7"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              data_elm[field_elm as keyof MatchData]
                            )}
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

export default Home;
