const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const appRoutes = require("./routes/index");
const path = require("path");
const Database = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
require('dotenv').config();





// server configuration
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
// external routes

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URL,
      collectionName:"sessions",
    })
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session())

app.use(appRoutes);
Database();
// base url
app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("notFound");
});


module.exports = app;
