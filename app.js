//API Key and Endpoints
const API_KEY = "8fcf888a0854370c739ac800d2935f07";
const API_URL_CITY = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_URL_GEO = "http://api.openweathermap.org/data/2.5/weather?lat="; 
const API_URL_FORECAST = "https://api.openweathermap.org/data/2.5/onecall?lat=";

window.addEventListener('load', () => {
    let date = new Date();

    document.getElementById("year").innerHTML = date.getFullYear();
  });

function unixTimeConvert(unixtime, query) {
    const milliseconds = unixtime * 1000;
    const dateObject = new Date(milliseconds);

    switch(query) {
        case "weekday":
            return dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
        case "month":
            return dateObject.toLocaleString("en-US", {month: "long"}) // December
        case "day":
            return dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
        case "year":
            return dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
        case "hour":
            return dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
        case "minute":
            return dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
        case "second":
            return dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
        case "timezone":
            return dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST
    }
}

function setIcons(weatherType, iconElement, currentIsTrue) {
    const skycons = new Skycons({color: "white"});
    let currentIcon = "";
    const hours = new Date().getHours();
    let isDayTime = hours > 6 && hours < 18;

    switch(weatherType) {
        case "Thunderstorm":
        case "Drizzle":
        case "Rain":
            currentIcon = "RAIN";
            break;
        case "Snow":
            currentIcon = "SNOW";
            break;
        case "Mist":
        case "Fog":
            currentIcon = "FOG";
        break;
        case "Clouds":
            if(currentIsTrue == false) {
                currentIcon = "PARTLY_CLOUDY_DAY";
                break;
            } else 
                if(isDayTime) {
                    currentIcon = "PARTLY_CLOUDY_DAY";
                } else
                    currentIcon = "PARTLY_CLOUDY_NIGHT";
            break;
        case "Clear":
            if(currentIsTrue == false) {
                currentIcon = "CLEAR_DAY";
                break;
            } else 
                if(isDayTime) {
                    currentIcon = "CLEAR_DAY";
                } else
                    currentIcon = "CLEAR_NIGHT";
            break;
        default:
            currentIcon = "CLEAR_DAY";
    }

    skycons.play();
    
    return skycons.set(iconElement, Skycons[currentIcon]);
}

function getCurrentWeatherByGeo() {
    let long;
    let lat;
    let url = "";

    let errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log("Long: " + long);
            console.log("Lat: " + lat);

            url = API_URL_GEO + lat + "&lon=" + long + "&units=imperial&appid=" + API_KEY;
            console.log(url);
            
            getCurrentWeather(url);
        })
    } else {
        errorMessage.innerHTML = "Geolocation must be enabled to get current weather";
        return;
    }
}

function getCurrentWeatherBySearch() {

    let cityName = document.getElementById("searchbox");
    let url = "";

    let errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    console.log(cityName);

    if(cityName.value === "" || cityName.value === null) {
        errorMessage.innerHTML = "City name cannot be blank";
        return;
    }

    try {
        url = API_URL_CITY + cityName.value + "&units=imperial&appid=" + API_KEY;
        console.log(url);

        getCurrentWeather(url);
    } catch {
        error => console.log(error);
    }
}

function getWeatherForecast(lat, long) {
    let url = "";

    let forecast;
    let weekday = "";
    let forecastCondition;

    let errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    url = API_URL_FORECAST + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=" + API_KEY;
    console.log(url);

    axios.get(url)
        .then(res => {
            forecast = res.data;
            console.log(forecast);

            for(let i = 0;i < 5;i++) {
                weekday = unixTimeConvert(forecast.daily[i].dt, "weekday").toString().slice(0,3);
                document.getElementById("weekday-0" + (i + 1)).innerHTML = "<h2>" + weekday + "</h2>";

                forecastCondition = forecast.daily[i].weather[0].main;
                setIcons(forecastCondition, document.getElementById("icon-0" + (i + 1)), false);

                document.getElementById("high-0" + (i + 1)).innerHTML = parseInt(forecast.daily[i].temp.max) + "&deg; F";
                document.getElementById("low-0" + (i + 1)).innerHTML = parseInt(forecast.daily[i].temp.min) + "&deg; F";
            }
    })
    .catch(error => {
        errorMessage.innerHTML = "Unable to get 5 Day Forecast";
        console.log(error);
    })
}

//After page loads, run this function
function getCurrentWeather(url) {
    let lat;
    let long;

    let weatherCondition = "";
    let sunriseTime = "";
    let sunsetTime = "";

    let errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    axios.get(url)
        .then(response => {
            const weather = response.data;
            console.log(weather);
            //Populate DOM Elements with API info

            lat = weather.coord.lat;
            long = weather.coord.lon;

            //Invoke the 1 Call API to retreve 5 Day Forecast using geolocation coordinates
            getWeatherForecast(lat, long);

            document.getElementById("location-city").textContent = weather.name;
            document.getElementById("location-country").textContent = weather.sys.country;
            document.getElementById("temperature-degree").textContent = parseInt(weather.main.temp);
            document.getElementById("weather-description").textContent = weather.weather[0].main;

            if(weather.weather[0].main === "Clouds") {
                document.getElementById("weather-description").textContent = "Cloudy";
            }

            //Match weather icon with the weather data returned from the API
            weatherCondition = weather.weather[0].main;
            setIcons(weatherCondition, document.getElementById('icon'), true);

            //Populate table of weather conditions
            document.getElementById("wind-speed").textContent = "Wind: " + weather.wind.speed.toString() + " mph";
            document.getElementById("humidity").textContent = "Humidity: " + weather.main.humidity.toString() + "%";
            document.getElementById("high-temp").innerHTML = "High: " + parseInt(weather.main.temp_max).toString() + "&deg; F";
            document.getElementById("low-temp").innerHTML = "Low: " + parseInt(weather.main.temp_min).toString() + "&deg; F";

            sunriseTime = unixTimeConvert(weather.sys.sunrise,"timezone").toString().slice(12, 23);
            sunsetTime = unixTimeConvert(weather.sys.sunset,"timezone").toString().slice(12, 23);
            document.getElementById("sunrise").textContent = "Sunrise: " + sunriseTime;
            document.getElementById("sunset").textContent = "Sunset: " + sunsetTime;
        })
        .catch(error => {
            errorMessage.innerHTML = "City name is not valid";
            console.error(error);
        });
}