const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const fs = require("fs");
const request = require("request");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));


/* 
-----------------------------------------------------------
Handle routes
*/

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

// Get current weather
function getWeather(city, res) {
    const apiKey = process.env.openweathermap;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = xhttp.responseText;
            res.send(response);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

/* 
-----------------------------------------------------------
MAP OPERATIONS
*/

// Read cities data
function readCsv() {
    const file = "./public/data/worldcities.csv";
    let cities = fs.readFileSync(file, "utf8");

    return cities;
}

// Parse cities data
function parseCsv(data) {
    let parsedData = [];
    let cities = readCsv();
    cities = cities.split("\n");

    for(let i = 0; i < cities.length; i++) {
        const parsedRow = [];
        const row = cities[i].split(",");
        // Remove extra ""
        for (let i = 0; i < row.length; i++) {
            parsedRow.push(row[i].slice(1, row[i].length - 1));
        }
        parsedData.push(parsedRow);
    }
    return parsedData;
}

// Find selected city
function filterCity(data, city) {
    let result;
    city = city.toLowerCase();
    city = city[0].toUpperCase() + city.slice(1);
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if(row[0] === city) {
            result = row;
            break;
        }
    }
    return result;
}

// Returns lon/lat coordinates of selected city
function getLatLon(city) {
    let data = readCsv();
    data = parseCsv(data);
    let filteredData = filterCity(data, city);
    let result = {
        lon: filteredData[3],
        lat: filteredData[2]
    }
    return result;
}

// Calculate haversine distance between lon/lat coordinates
function haversineDistance(lon1, lat1, lon2, lat2) {
    // Earth radius
    const r = 6371;
    // Distance between the lon and lat coordinates
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    // Convert to radians
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    // Formula
    let a = Math.pow(Math.sin(dLat / 2), 2) + 
        Math.pow(Math.sin(dLon / 2), 2) *
        Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.asin(Math.sqrt(a));
    
    return r * c;
}

/*
-----------------------------------------------------------
*/

// Listen to the defined PORT
app.listen(PORT);