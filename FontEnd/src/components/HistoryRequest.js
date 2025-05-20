import React from "react";
import "./HistoryRequest.css";

const HistoryRequest = ({ requests }) => {
  return (
    <div className="history-box">
      {requests.length === 0 ? (
        <p className="text-muted">No map requests found.</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            className="request-node left-align"
            style={{ // https://assets.ppy.sh/beatmaps/1844826/covers/cover.jpg
                backgroundImage: `linear-gradient(to left, rgb(41, 40, 40) 0%, rgba(41, 40, 40, 0.85) 40%, rgba(41, 40, 40, 0.5) 100%), url(https://assets.ppy.sh/beatmaps/${request.mapInfo[0].beatmapset_id}/covers/cover.jpg)`,
                backgroundSize: "cover",
            }}// dd/mm/yyyy hh:mm AM/PM
          >
            <span className="time">
              {new Date(request.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <a target="_blank" rel="noopener noreferrer" href={`https://osu.ppy.sh/b/${request.mapInfo[0].beatmap_id}`} className="request-text">
              <span className="text"> [ {request.mapInfo[0].title} [{request.mapInfo[0].version}] By {request.mapInfo[0].creator} ]</span>
            </a>
            <span className="time"> was request by {request.twitchUsername}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryRequest;

