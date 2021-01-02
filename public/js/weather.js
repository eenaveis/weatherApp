/*
Barometer icon made by https://www.flaticon.com/authors/freepik
Humidity icon made by https://www.flaticon.com/authors/pixel-perfect
Wind speed icon made https://www.flaticon.com/authors/photo3idea-studio
*/

/*
--------------------------------------------------------------
Weather functions
*/

// Update current weather for selected city
function getWeather(city) {
    if(city === undefined) {
        city = document.getElementById("search-bar").value;
    }
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            let parsedData = parseApiResponse(data);
            updateWeather(parsedData);
        }
    }
    xhttp.open("POST", "/weather", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("city=" + city);
}

// Parse the weather API response
function parseApiResponse(response) {
    let data = {
    // City
        city: response["name"],
    // Degrees
        temp: response["main"]["temp"],
    // Weather condition icon
        icon: response["weather"][0]["icon"],
    // Weather condition
        condition: response["weather"][0]["main"],
    // Air pressure hPa
        pressure: response["main"]["pressure"],
    // Humidity %
        humidity: response["main"]["humidity"],
    //  Feels like
        feelsLike: response["main"]["feels_like"],
    // Wind speed
        speed: response["wind"]["speed"]
    };
    return data;
}

// Update current weather on the index page
function updateWeather(data) {
    // Current time
    let time = getTime();
    
    // Html elements
    let city = document.getElementById("city");
    let date = document.getElementById("date");
    let temp = document.getElementById("temp");
    let condition = document.getElementById("condition");
    let feelsLike = document.getElementById("feels-like");
    
    // Condition icon url
    const conditionIconUrl = getWeatherCondition(data.icon);

    // Update DOM
    city.innerHTML = `${data.city}<img id="condition-icon" src="${conditionIconUrl}">`;
    date.innerHTML = `as of ${time.hours}:${time.minutes}`
    temp.innerHTML = `${data.temp.toFixed(0)}&#8451;`
    condition.innerHTML = data.condition;
    
    // Secondary data
    feelsLike.innerHTML = `Feels like ${data.feelsLike.toFixed(0)}&#8451;`;
    createWeatherTable(data.pressure, data.humidity, data.speed);
}

// Update secondary data table
function createWeatherTable(pressure, humidity, windSpeed) {
    // Table element
    let table = document.getElementById("secondary-data-table");
    
    // Make sure the table is empty
    while(table.firstChild) {
        table.removeChild(table.firstChild);
    }
    
    // Create table rows
    let row1 = document.createElement("tr");
    let row2 = document.createElement("tr");
    let row3 = document.createElement("tr");
    
    // Create table data
    let airpressure = document.createElement("td");
    let humid = document.createElement("td");
    let speed = document.createElement("td");
    
    airpressure.innerHTML = "<img class='weather-icon' src='../img/gauge.svg'> Air pressure";
    humid.innerHTML = "<img class='weather-icon' src='../img/humidity.svg'> Humidity";
    speed.innerHTML = "<img class='weather-icon' src='../img/anemometer.svg'> Wind speed";

    let airpressureData = document.createElement("td");
    let humidData = document.createElement("td");
    let speedData = document.createElement("td");
    
    airpressureData.innerHTML = `${pressure} hPa`;
    humidData.innerHTML = `${humidity} %`;
    speedData.innerHTML = `${windSpeed} m/s`;
    
    // Append cells to rows
    row1.appendChild(airpressure);
    row1.appendChild(airpressureData);

    row2.appendChild(humid);
    row2.appendChild(humidData);

    row3.appendChild(speed);
    row3.appendChild(speedData);
    
    // Append rows to table
    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
}

// Returns weather condition icon URL
function getWeatherCondition(code) {
    let url = `http://openweathermap.org/img/wn/${code}@2x.png`
    
    return url;
}

/*
--------------------------------------------------------------
Time functions*/

// Get current time
function getTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    hours = updateTime(hours);
    minutes = updateTime(minutes);

    let result = {
        hours: hours,
        minutes: minutes
    };
    
    return result;
}

// Helper function for getTime
function updateTime(x) {
    if (x < 10) {
        return "0" + x;
    } else {
        return x;
    }
}

/*
--------------------------------------------------------------
Map functions*/

// Get city map and render to index page
function getMap(city) {
    if(city === undefined) {
        city = document.getElementById("search-bar").value;
    }

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            let urlCreator = window.URL;
            imageUrl = urlCreator.createObjectURL(xhttp.response);    
            document.getElementById("map-image").src = imageUrl;
        }
    }
    xhttp.open("POST", "/map", true);
    xhttp.responseType = "blob";
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("city=" + city);
}

/*
--------------------------------------------------------------
Form submit event*/

// Handle search form submit event
document.getElementById("search-form").addEventListener("submit", event => {
    event.preventDefault();
    getWeather();
    getMap();
})

/*
--------------------------------------------------------------
Call getWeather and getMap*/

getWeather("Helsinki");
getMap("Helsinki");

// Print secret message to the console
let wave = String.fromCodePoint(0x1F44B);
console.log(wave, "Looking for a developer to hire? Contact me on LinkedIn: https://fi.linkedin.com/in/sievanen");

// module export for testing
//export {updateTime, getTime, parseApiResponse};