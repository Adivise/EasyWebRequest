import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import twitch from "../icons/twitch.svg";
import HistoryRequest from "../components/HistoryRequest.js";
import Header from "../components/Header.js";
import "../components/Login.css"; // CSS File
import config from "../config.js"; // Import config file

const Login = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try { // http://localhost:3001/getRequests
        const response = await fetch(`${config.REACT_APP_API_URL}/getRequests`);
        if (response.ok) {
          const data = await response.json();
          setRequests(data.maps);
        } else {
          console.error("Failed to fetch requests");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();

  }, []);

  const twitchLogin = () => { // http://localhost:3001/auth/twitch
    window.open(`${config.REACT_APP_API_URL}/auth/twitch`, "_self");
  };

  return (
    <div className="Login">
      {/* ✅ Add Header component at the top */}

      <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.87)", height: "100vh" }}>
        <Header />
        <HistoryRequest requests={requests} />

        {/* Login Button */}
        <button type="button" className="btn btn-primary mt-3" onClick={twitchLogin}>
          Login via Twitch <img src={twitch} alt="Twitch Logo" className="twitchLogo"/>
        </button>

      </div>
    </div>
  );
}

export default Login;