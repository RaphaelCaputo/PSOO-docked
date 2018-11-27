const { User } = require("../models/index");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  User.findAll().then(users => res.json(users));
});

router.post("/create", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => console.log(JSON.stringify(user)));
  res.redirect("/users");
});

module.exports = router;
