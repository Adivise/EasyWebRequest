import React, { useState } from "react";
import "./Nav.css";
import config from "../config";

const Nav = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Move useState OUTSIDE condition

  if (!user) return null; // ✅ This remains fine, but useState must be above it

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => { // http://localhost:3001/auth/logout
    window.open(`${config.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <nav id="functions" className="nav-container">
      {/* User Profile */}
      <div className="func-box user-profile" onClick={toggleMenu}>
        <span data-set="user-profile" aria-expanded="false">
          <img src={user.image || "https://static-cdn.jtvnw.net/jtv_user_pictures/default-profile_image.png"} alt="User Profile" />
        </span>

        {/* Animated Dropdown Menu */}
        <div className={`profile-menu ${menuOpen ? "open" : ""}`}>
          <p>{user.twitchUsername}</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
