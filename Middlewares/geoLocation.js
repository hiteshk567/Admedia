const fetch = require("node-fetch");
const getClientIp = require("./getClientIP");
require("dotenv").config();

const GEO_API_URL = "https://api.ipstack.com/";
const { ACCESS_KEY } = process.env || {};

const fetchGeoLocation = async (req, res, next) => {
  try {
    const ip = req.clientIp || "check";
    const geoResponse = await fetch(
      `${GEO_API_URL}${ip}?access_key=${ACCESS_KEY}&format=1`
    );
    const geoData = await geoResponse.json();

    req.geoData = {
      latitude: geoData?.latitude,
      longitude: geoData?.longitude,
      city: geoData?.city || "Unknown Location",
    };

    next();
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    res.status(500).json({ error: "Failed to fetch geolocation data" });
  }
};

module.exports = [getClientIp, fetchGeoLocation];
