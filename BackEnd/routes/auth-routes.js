const app = require("express").Router();
const passport = require("passport");
require("dotenv").config();

// Logout route with improved error handling
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.REDIRECT_URL || "http://localhost:3000/");
  });
});

// Handle login failure
app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
  });
});

// Handle successful login
app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "No user data found",
    });
  }
});

// Authentication with Twitch
app.get("/twitch", passport.authenticate("twitch"));

// Twitch OAuth Redirect with error handling
app.get(
  "/twitch/redirect",
  passport.authenticate("twitch", {
    successRedirect: process.env.REDIRECT_URL || "http://localhost:3000/",
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.json({ success: true, message: "Redirect successful" });
  },
);

module.exports = app;
