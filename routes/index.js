const express = require("express");
const appRoutes = express.Router();
const authRoutes = require("./auth.routes");

appRoutes.use(authRoutes);

module.exports = appRoutes;
