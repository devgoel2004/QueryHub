const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const authRoute = express();
authRoute.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
authRoute.use(passport.initialize());
authRoute.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// Google Authentication Route

authRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/queryhub",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/queryhub/profile"); // Redirect to frontend profile page
  }
);

authRoute.get("/profile", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Logout
authRoute.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173/queryhub");
  });
});
module.exports = authRoute;
