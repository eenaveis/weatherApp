/*
--------------------------------------------------------------
Weather operations
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
        feels_like: response["main"]["feels:_like"],
    // Wind speed
        speed: response["wind"]["speed"],
    // Sunrise

    // Sunset

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
    // Condition icon url
    const conditionIconUrl = getWeatherCondition(data.icon);

    // DOM operations
    city.innerHTML = `${data.city}<img id="condition-icon" src="${conditionIconUrl}">`;
    date.innerHTML = `as of ${time.hours}:${time.minutes}`
    temp.innerHTML = `${data.temp}&#8451;`
    condition.innerHTML = data.condition;
    
}

// Returns weather condition icon URL
function getWeatherCondition(code) {
    let url = `http://openweathermap.org/img/wn/${code}@2x.png`
    
    return url;
}

/*
--------------------------------------------------------------
Time operations
*/

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
Map operations
*/

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
Form submit
*/

// Handle search form submit event
document.getElementById("search-form").addEventListener("submit", event => {
    event.preventDefault();
    getWeather();
    getMap();
})

/*
--------------------------------------------------------------
*/

getWeather("Helsinki");
getMap("Helsinki");