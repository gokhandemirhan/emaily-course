const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

/*
 * Mongoose model class
 */
const User = mongoose.model("Users");

/*
 * Serialize user object for cookie creation
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

/*
 * Authenticate user with Google
 * If we provide relative path (/auth/google/callback), 
 * can cause https/http issues on redirection
 */
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleCLientSecret,
            callbackURL: "/auth/google/callback",
            proxy:true
        },
        (accessToken, refreshToken, profile, done) => {
            /*
             * Callback function that passport.js made to google
             */

            User.findOne({ googleId: profile.id }).then(user => {
                if (user) {
                    // We already have a record with given googleId
                    // call passport.js done function with null error
                    done(null, user);
                } else {
                    new User({ googleId: profile.id }).save().then(user => {
                        //Call done function with the newly created user
                        done(null, user);
                    });
                }
            });
        }
    )
);
