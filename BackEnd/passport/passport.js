const passport = require("passport");
const TwitchStrategy = require("passport-twitch-new").Strategy;
const Database = require("../models/Users.js");
require("dotenv").config();

// Serialize user session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Database.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Register Twitch authentication strategy
passport.use(new TwitchStrategy({
      clientID: process.env.TWITCH_CLIENT,
      clientSecret: process.env.TWITCH_SECRET,
      callbackURL: "/auth/twitch/redirect", // shortened URL / full URL http://localhost:3001/auth/twitch/redirect
      scope: "user_read",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in database
        let currentUser = await Database.findOne({ twitchID: profile.id });
        if (currentUser) {
          return done(null, currentUser);
        }
        // Create new user if not found
        const newUser = await new Database({
          twitchUsername: profile.display_name,
          twitchID: profile.id,
          image: profile.profile_image_url,
        }).save();
        console.log("New user created:", newUser);
        return done(null, newUser);
      } catch (error) {
        console.error("Error in Twitch authentication:", error);
        return done(error, null);
      }
    }
  )
);
