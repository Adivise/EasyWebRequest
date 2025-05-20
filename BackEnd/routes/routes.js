const { sendMap } = require("../api/Sender.js");
const Map = require("../models/Maps.js");
const app = require("express").Router();

app.get("/getRequests", async (req, res) => {
  try {
    const maps = await Map.find().sort({ createdAt: -1 }); // ✅ Fetch latest maps
    res.json({ maps });
  } catch (error) {
    console.error("❌ Error fetching maps:", error);
    res.status(500).json({ error: "Failed to retrieve map requests." });
  }
  console.log("Fetching map requests...");
});

app.post("/sendMap", (req, res) => {
  let data = req.body;

  // Validate the map link
  if (!data.map || data.map.length === 0) {
    return res.json({ msg: "Please fill in the field!" });
  } else if (!data.map.includes("https://osu.ppy.sh/beatmapsets/")) {
    return res.json({ msg: "Please add a valid link." });
  } else if (
    data.map.includes("#taiko") || 
    data.map.includes("#fruits") || 
    data.map.includes("#mania")
  ) {
    return res.json({ msg: "Please add a valid osu!standard map link." });
  }

  console.log("Submitting:", data);

  sendMap(data);

  return res.json({ msg: `Map submitted by ${data.twitchUsername}!` });
});

module.exports = app;