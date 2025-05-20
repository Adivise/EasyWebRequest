const bancho = require("bancho.js");
const nodesu = require("nodesu");
const Database = require("../models/Maps.js");

const sendMap = (req) => {
  try {
    if (typeof req.map !== "string") {
      throw new Error("Invalid map link: Expected a string.");
    }

    const fullMapLink = req.map.trim();
    const mapID = fullMapLink.split("/").pop(); // ✅ Extract the last part of the URL

    const client = new bancho.BanchoClient({
      username: process.env.OSU_USERNAME,
      password: process.env.OSU_PWD,
    });

    client.connect().then(async () => {
      console.log("Connected to Bancho as", client.getSelf().ircUsername);
      const msg = client.getUser(process.env.OSU_OPPONENT);
      const api = new nodesu.Client(process.env.API_KEY);

      const beatmaps = await api.beatmaps.getByBeatmapId(mapID);
      if (!beatmaps || beatmaps.length === 0) {
        client.disconnect();
        console.error("Failed to fetch map details: No beatmaps found.");
        return;
      }

      const songTitle = beatmaps[0]["title"];
      const artistName = beatmaps[0]["artist"];
      const diffName = beatmaps[0]["version"];

      const finalMessage = `[${fullMapLink} ${artistName} - ${songTitle} [${diffName}]]`;
      if (req.mods.length > 0) {
        const modsString = req.mods.map((mod) => `+${mod}`).join(" ");
        finalMessage += ` ${modsString}`;
      }

      msg.sendMessage(`@${req.twitchUsername}: ${finalMessage}`);
      console.log(`@${req.twitchUsername}: ${finalMessage}`);

      new Database({ mapInfo: beatmaps[0], twitchUsername: req.twitchUsername }).save().then(() => {
          console.log(`Map ${mapID} saved to the database.`);
          client.disconnect();
          console.log("Disconnected from Bancho.");
        }).catch((err) => console.error(`Error saving map ${mapID}:`, err));
    });
  } catch (err) {
    console.error("Error in sendMap:", err);
  }
};

module.exports = { sendMap };
