/*-----------------------------------------------------------
Module imports*/

const fs = require("fs");

/*-----------------------------------------------------------
Map functions
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

module.exports = getLatLon;