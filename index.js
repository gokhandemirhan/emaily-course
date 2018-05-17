const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

/*
 * Connect to mongoose
 */
mongoose.connect(keys.mongoURI);

const app = express();

/*
 * Tell express it need to make use of cookies
 */
app.use(
	// 30 days, 24 hours, 60 minutes, 60 seconds, 1000 miliseconds
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

/*
 * Require the auth routes function and immediately call it with "app" parameter
 */
require("./routes/authRoutes")(app);

/*
 * Define port for heroku's dynamic port
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
