import axios from "axios";
import { MatchData } from "./helpers";

export const addMatch = async (matchData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:4040/matches/add/",
      JSON.parse(matchData)
    );
    console.log(response.data);
    return response.data; // Fetch data after adding a match
  } catch (error) {
    console.error("Error adding match:", error);
  }
};

// 1.6
export const updateMatch = async (id: String, match_data: any) => {
  try {
    console.log(id);
    console.log(match_data);
    const response = await axios.post(
      `http://localhost:4040/matches/update?id=${id}`,
      match_data
    );
    console.log(response.data);
    return response.data; // Fetch data after adding a match
  } catch (error) {
    console.error("Error adding match:", error);
  }
};

// view team
export const fetchTeamById = async (id: String) => {
  try {
    const response = await axios.get(
      `http://localhost:4040/matches/view/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 1.4
export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:4040/matches/");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//1.8
export const deleteTeamByID = async (id: String) => {
  try {
    const response = await axios.post(
      `http://localhost:4040/matches/delete/${id}`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 1.7
export const fetchStatsForYear = async (year: String) => {
  try {
    const response = await axios.get(
      `http://localhost:4040/matches/year/${year}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

// 2.0
export const fetchTeamsWithAvgGoals = async (year: String) => {
  try {
    const response = await axios.get(
      `http://localhost:4040/matches/stats?year=${year}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching teams with avg goals:", error);
  }
};

// 1.9
export const fetchTopTeams = async (minWins: String) => {
  try {
    const response = await axios.get(
      `http://localhost:4040/matches/wins?minWins=${minWins}`
    );
    console.log("response : " + response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top teams:", error);
  }
};
