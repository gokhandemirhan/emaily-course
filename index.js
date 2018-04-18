const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

/*
 * Define port for heroku's dynamic port
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
