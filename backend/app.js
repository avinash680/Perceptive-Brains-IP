const dotenv = require("dotenv");
const express = require('express');
const cors = require("cors");
const consultationRoute = require('./routes/consultation.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello");
});

app.use('/consultation', consultationRoute);


module.exports = app;