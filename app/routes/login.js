const { User } = require("../models/index");
var LocalStorage = require("node-localstorage").LocalStorage;
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Login here!");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Invalid email or password.");

  if (req.body.password == user.password) {
    res.redirect("http://localhost:3000/login/token");
  } else return res.status(400).send("Invalid email or password.");
});

module.exports = router;
