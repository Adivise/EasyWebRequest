const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");

require("dotenv").config();

// Import Routes
const routes = require("./routes/routes.js");
const authRoutes = require("./routes/auth-routes.js");

// Import & Register Passport Strategies **BEFORE** Using Passport
require("./passport/passport.js"); // Ensure Twitch strategy is registered before initializing Passport

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ Database Error:", err));

const app = express();

// Configure Session
app.use(session({
  secret: crypto.randomBytes(32).toString("hex"), // Use a secure random secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Change to `true` in production for HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 60, // Session max age in milliseconds
    sameSite: "lax",
  },
}));

// Initialize Passport BEFORE Using Routes
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Improved CORS Configuration
app.use(cors({
  origin: [process.env.REDIRECT_URL || "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Setup Routes
app.use("/", routes);
app.use("/auth", authRoutes);

// Handle React Frontend Requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Express Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server API
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
