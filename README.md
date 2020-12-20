# Animated Live Weather App

<img width="600" alt="Screen Shot 2020-12-20 at 2 06 32 PM" src="https://user-images.githubusercontent.com/25806927/102722063-9970cc00-42cc-11eb-9d69-18116a426e44.png">


### Overview

This is an animated live weather app that calls the OpenWeather API to retrieve current weather info and 5-day forecast. I wanted to use a simple and clean design allow a smoother user experience and readability.

### Functionality

<img width="600" alt="Screen Shot 2020-12-20 at 2 03 26 PM" src="https://user-images.githubusercontent.com/25806927/102721993-28311900-42cc-11eb-99f5-9820e55f5f57.png">

This app makes axios calls to the OpenWeather API to retrieve weather information. Because on the design of the OpenWeather API, this app actually has to make two calls – one for the current weather based on city name to get the geolocation coordinates, then also make another call to different endpoint using the coordinates to get the 5-day forecast for that location. If the API allowed both current weather and 5-day forecast under one endpoint, I would love to consolidate the API calls for an even faster and smoother experience.

<img width="600" alt="Screen Shot 2020-12-19 at 6 36 36 PM" src="https://user-images.githubusercontent.com/25806927/102721838-48aca380-42cb-11eb-9337-14d6ff2a4bdb.png">

When run locally, you can also retrieve current weather information using your current geolocation. There will be a prompt in your browser to Allow Location Access or Don’t Allow. If you Allow Location Access, the geolocation coordinates will be funneled to an separate API call to get the current weather information for your location.

<img width="600" alt="Screen Shot 2020-12-20 at 2 07 28 PM" src="https://user-images.githubusercontent.com/25806927/102722096-cfae4b80-42cc-11eb-8ab9-7f6dccffc2dc.png">

<img width="600" alt="Screen Shot 2020-12-20 at 2 07 46 PM" src="https://user-images.githubusercontent.com/25806927/102722097-d5a42c80-42cc-11eb-9eab-24d34a1d6030.png">

The app has exception handling in case the city name is blank or spelled incorrectly when submitting the request. 

This app is deployed on AWS. Access the app here:
http://liveweatherapp.s3-website-us-east-1.amazonaws.com/
