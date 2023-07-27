const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
require("dotenv").config();

// Google authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            // TODO: Add user handling logic here

            // Continue with authentication flow
            return done(null, profile);
        }
    )
);

// Serialization and deserialization of users
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});