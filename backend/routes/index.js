/*----  
  Entry point to routes
----*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
requre('dotenv').config();

const expenseRoutes = require('./expense-routes');
// const loginRoutes = require('./loginRoutes')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['*'],
    // origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(expenseRoutes);
app.use(loginRoutes);

module.exports = app;
