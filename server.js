const winston = require("winston");
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./app/routes/users");
const login = require("./app/routes/login");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", users);
app.use("/login", login);

app.get("/", (req, res) => {
  res.send("Hello World !?");
});

console.log(`app: ${app.get("env")}`);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
