const express = require("express");
const fetchGeoLocation = require("../Middlewares/geoLocation");

const router = express.Router();

require("dotenv").config();

const { APP_ID } = process.env || {};

// Weather route
router.get("/", fetchGeoLocation, async (req, res) => {
  const { latitude, longitude, city } = req.geoData;

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_ID}&units=imperial`
    );
    const weatherData = await weatherResponse.json();

    res.json({
      city,
      temperature: weatherData?.main?.temp,
      description: weatherData?.weather[0]?.description,
      icon: weatherData?.weather[0]?.icon,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
