const express = require("express");
const User = require("../models/user.model");
const passport = require("passport");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      console.log(email);
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

// create session id
// whenever we login it creares user id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

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
authRoutes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  }),
  (req,res)=>{
    console.log(req.body)
  }
);
// profile protected route

module.exports = authRoutes;
