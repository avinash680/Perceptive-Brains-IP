const dotenv = require("dotenv");
const express = require('express');
const cors = require("cors");
const consultationRoute = require('./routes/consultation.route');
const config = require('./config/env');

const app = express();

const allowedOrigins = (config.frontendOrigin || "*")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello");
});

app.use('/consultation', consultationRoute);


module.exports = app;