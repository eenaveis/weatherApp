function getWeather(city) {
    const apiKey = "YOUR_API_KEY";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            // If bad request
            
            // Parse response
            let data = parseApiResponse(response);
            // Update weather
            updateWeather(data);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function parseApiResponse(response) {
    let data = [];
    // City
    data.push({city: response["name"],
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

    });
    return data;
}

function updateWeather(data) {
    // Current time
    let time = getTime();
    // Html elements
    let city = document.getElementById("city");
    let date = document.getElementById("date");
    let temp = document.getElementById("temp");
    let condition = document.getElementById("condition");
    // Condition icon url
    const conditionIconUrl = getWeatherCondition(data[0]["icon"]);

    // DOM operations
    city.innerHTML = `${data[0]["city"]}<img id="condition-icon" src="${conditionIconUrl}">`;
    date.innerHTML = `as of ${time[0].hours}:${time[0].minutes}`
    temp.innerHTML = `${data[0]["temp"]}&#8451;`
    condition.innerHTML = data[0]["condition"];
    
}

function getWeatherCondition(code) {
    let url = `http://openweathermap.org/img/wn/${code}@2x.png`
    
    return url;
}

function updateTime(x) {
    if (x < 10) {
        return "0" + x;
    } else {
        return x;
    }
}

function getTime() {
    let result = []
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    hours = updateTime(hours);
    minutes = updateTime(minutes);


    result.push({
        hours: hours,
        minutes: minutes
    });

    return result;
}

function getMap(city) {
    let apiKey = "";
    // Helsinki lat/lon
    let lat = "60.1756";
    let lon = "24.9342";
    let url = "";
}

getWeather("Helsinki");