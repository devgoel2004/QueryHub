const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        });
        if (!user) {
          user = new User({
            name: profile.displayName,
            googleId: profile.id,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            tags: [],
          });
          await user.save();
          sendEmail({
            email: profile.emails[0].value,
            subject:
              "Welcome to QueryHub - Let's Build, Learn & Grow Together!",
            message: `Hi ${profile.displayName},
  
                      Welcome to QueryHub! 🚀 We're thrilled to have you on board.
  
                      What is QueryHub?
                      QueryHub is a dynamic platform designed to help developers, students, and tech enthusiasts ask questions, share knowledge, and collaborate on coding, development, and problem-solving. Whether you're debugging an issue, exploring new technologies, or contributing insights, this is the place for you!
  
                      🔹 Ask & Answer - Post your questions and help others by sharing your expertise.
                      🔹 Learn & Grow - Explore a vast knowledge base of coding problems, tutorials, and discussions.
                      🔹 Connect & Collaborate - Engage with a community of like-minded tech enthusiasts.
  
                      We're excited to see how you contribute and grow with us! Start by asking your first question or exploring the latest discussions.
  
                      🚀 Join the conversation now: [Insert Link]
  
                      If you ever need help, feel free to reach out!
  
                      Happy Learning,
                      The QueryHub Team`,
          });
        }
        let token = generateToken(user);

        user.token = token;
        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
