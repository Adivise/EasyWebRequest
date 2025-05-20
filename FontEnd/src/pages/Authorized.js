import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import HistoryRequest from "../components/HistoryRequest.js";
import Header from "../components/Header.js";
import Select from "react-select"; // Import Multi-Select Dropdown
import "../components/Authorized.css"; // CSS File
import config from "../config.js"; // Import config file

const modOptions = [
  { value: "Easy", label: "Easy" },
  { value: "No-Fail", label: "No-Fail" },
  { value: "Half Time", label: "Half Time" },
  { value: "Hidden", label: "Hidden" },
  { value: "Hard Rock", label: "Hard Rock" },
  { value: "Double Time", label: "Double Time" },
  { value: "Flashlight", label: "Flashlight" },
];

const Authorized = ({ user, twitchSuccess }) => {
  const [map, setMap] = useState("");
  const [selectedMods, setSelectedMods] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (twitchSuccess && user?.twitchUsername) {
      setMap("");
    }
    // get map from database /getRequests
    const fetchRequests = async () => {
      try { // http://localhost:3001/getRequests dotenv
        const res = await axios.get(`${config.REACT_APP_API_URL}/getRequests`);
        if (res.status === 200) {
          setRequests(res.data.maps);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to fetch requests.");
      }
    };
    fetchRequests(); // ✅ Call it inside useEffect properly
  }, [twitchSuccess, user]);


  const handleMap = (e) => {
    setMap(e.target.value);
  };

  const handleModChange = (mods) => {
    if (mods.length > 2) {
      toast.error("You can select up to 2 mods only!");
      return;
    }
    setSelectedMods(mods);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!map.trim()) return toast.error("Please enter a map link.");

    const osuStandardRegex = /https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#osu\/\d+/;
    if (!osuStandardRegex.test(map)) {
      return toast.error("Invalid map link. Only osu!standard maps with '#osu' are allowed.");
    }

    if (!user?.twitchUsername) {
      return toast.error("Login required!");
    }

  try { //"http://localhost:3001/sendMap"
    const res = await axios.post(`${config.REACT_APP_API_URL}/sendMap`, { map, mods: selectedMods.map((mod) => mod.value), twitchUsername: user.twitchUsername });

      if (res.status === 200) {
        toast.success(`Map submitted with ${selectedMods.map((mod) => mod.label).join(", ")} by ${user.twitchUsername}!`);
        setMap("");
        setSelectedMods([]);
      }
    } catch (error) {
      toast.error("Submission failed.");
    }
  };

  const refreshWeb = () => {
    setTimeout(() => {
      window.location.reload();
    }, 5000); // Wait 5 seconds before refreshing
  };

  return (
    <div className="Login">
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.87)", height: "100vh" }}>
        <Header />
        <HistoryRequest requests={requests} />

        {/* ✅ Map Request Form with Multi-Select Dropdown */}
        <form onSubmit={handleSubmit} className="submit-container mt-3">
          <input
            onChange={handleMap}
            value={map}
            type="text"
            placeholder="Enter your osu! map link"
          />
          
          {/* Multi-Select Mod Dropdown */}
          <Select
            options={modOptions}
            isMulti
            className="mod-dropdown mt-1"
            onChange={handleModChange}
            value={selectedMods}
            placeholder="Select Mods"
          />
          {/* When click submit wait 5s and refresh */}
          <button type="submit" className="btn btn-primary mt-2" onClick={refreshWeb}>
            Submit Request
          </button>
        </form>

        <small className="example-text mt-2">
          Example: https://osu.ppy.sh/beatmapsets/461744#osu/1031991
        </small>
      </div>
    </div>
  );
};

export default Authorized;