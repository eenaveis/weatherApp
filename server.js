/*-----------------------------------------------------------
Module imports*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");
const getLatLon = require("./modules/maps.js");
const getWeather = require("./modules/weather.js");

// Define PORT
const PORT = process.env.PORT || 8080;

// Serve public folder
app.use(express.static("public"));

/*-----------------------------------------------------------
Handle routes*/

// Get index page
app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
});

// Handle weather API request
app.post("/weather", urlEncodedParser, (req, res) => {
    let city = req.body.city;
    // Get current weather
    getWeather(city, res);
});
// Handle map API request
app.post("/map", urlEncodedParser, (req, res) => {
    let city = req.body.city;
    // MapBox API key
    const apiKey = process.env.mapbox;
    // Get coordinates
    let coordinates = getLatLon(city);
    // Construct MapBox API URL
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${coordinates.lon},${coordinates.lat},10,0,0/434x250?access_token=${apiKey}`;
    request(url).pipe(res);
});

/*-----------------------------------------------------------*/

// Listen to the defined PORT
app.listen(PORT);