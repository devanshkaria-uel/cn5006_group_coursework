import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4040/",
  });
  const [matchTeam, setMatchTeam] = useState("No Team");
  const fetchMatches = async () => {
    var data = await axiosInstance.get("matches/");
    console.log(data.data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <button onClick={fetchMatches}>fetch data</button> */}
      </header>
    </div>
  );
}

export default App;
