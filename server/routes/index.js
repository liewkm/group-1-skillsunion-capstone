// Generate the app routes
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("../middleware");
const expenseRoutes = require("./expenseRoutes");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware for Firebase header auth decodeToken
app.use(middleware.decodeToken);
app.use("/api/expense", expenseRoutes);

module.exports = app;
