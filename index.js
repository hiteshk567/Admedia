const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const HTTP = require("http");
const locationWeatherRoute = require("./Routes/locationWeather");

const { PORT } = process.env || {};

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/weather", locationWeatherRoute);

app.listen(PORT || 3000, (error) => {
  if (!error) {
    console.log("Server is running successfull on port number: ", PORT);
  } else {
    console.log("Error occurred while starting the server: ", error);
  }
});

app.use((error, req, res, next) => {
  if (error) {
    console.log("something went wrong", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
