import React from "react";
import "./Header.css";
import logo from "../icons/btmcA.png"; // Adjust the path based on your project structure

const Header = () => {
  return (
    <div id="logo" className="header">
      <div id="img-logo">
        <img src={logo} alt="BTMC Logo" />
      </div>
      <span className="first">REQUESTS</span>
      <span className="version">BETA v0.0.1</span>
    </div>
  );
};

export default Header;