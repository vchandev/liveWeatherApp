# Animated Live Weather App
This is an animated live weather app that calls the OpenWeather API to retrieve current weather info and 5-day forecast. I wanted to use a simple and clean design allow a smoother user experience and readability.

This app makes axios calls to the OpenWeather API to retrieve weather information. Because on the design of the OpenWeather API, this app actually has to make two calls – one for the current weather based on city name to get the geolocation coordinates, then also make another call to different endpoint using the coordinates to get the 5-day forecast for that location. If the API allowed both current weather and 5-day forecast under one endpoint, I would love to consolidate the API calls for an even faster and smoother experience.

When run locally, you can also retrieve current weather information using your current geolocation. There will be a prompt in your browser to Allow Location Access or Don’t Allow. If you Allow Location Access, the geolocation coordinates will be funneled to an separate API call to get the current weather information for your location.

The app has exception handling in case the city name is blank or spelled incorrectly when submitting the request. 

This app is deployed on AWS. Access the app here:
http://liveweatherapp.s3-website-us-east-1.amazonaws.com/
