const express = require("express");
const User = require("../models/user.model");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// register: get

authRoutes.get("/register", (req, res) => {
  res.render("register.ejs");
});

// register: post
authRoutes.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already registered");
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const createUser = await User.create({ email, password: hash });
      res.status(201).redirect("/login");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// login : get
authRoutes.get("/login", (req, res) => {
  res.render("login.ejs");
});
// login : post
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user Not Found");

    // Load hash from your password DB.
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// profile protected route

module.exports = authRoutes;
