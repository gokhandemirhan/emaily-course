const express = require("express");

require("./services/passport");

const app = express();

/*
 * Require the auth routes function and immediately call it with "app" parameter
 */
require("./routes/authRoutes")(app);

/*
 * Define port for heroku's dynamic port
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
