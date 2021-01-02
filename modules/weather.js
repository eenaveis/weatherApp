/*-----------------------------------------------------------
Module imports */

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("dotenv").config();

/*-----------------------------------------------------------
Weather functions*/

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

module.exports = getWeather;