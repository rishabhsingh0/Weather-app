// array of cities
const cities = [
    {
        name: "New Delhi",
        lat: 28.61,
        lon: 77.20,
        value: "newDelhi"
    },
    {
        name: "Mumbai",
        lat: 19.07,
        lon: 72.87,
        value: "mumbai"
    },
    {
        name: "Kolkata",
        lat: 22.57,
        lon: 88.36,
        value: "kolkata"
    },
    {
        name: "Chennai",
        lat: 13.08,
        lon: 80.27,
        value: "chennai"
    },
    {
        name: "Bengaluru",
        lat: 12.97,
        lon: 77.59,
        value: "bengaluru"
    }
]
// variables
let city
const date1 = new Date()
const date = date1.getDate()

// function to determine air quality
const airQuality = (aqi) => {
    if (aqi > 0 && aqi <= 30) {
        return "Good"
    } else if (aqi > 30 && aqi <= 60) {
        return "Satisfactory"
    } else if (aqi > 60 && aqi <= 90) {
        return "Moderate"
    } else if (aqi > 90 && aqi <= 120) {
        return "Poor"
    } else if (aqi > 120 && aqi <= 250) {
        return "Very Poor"
    } else if (aqi > 250) {
        return "Severe"
    } else {
        return ""
    }
}

// function to determine city selected by user
const selectCity = () => {
    let userCity = document.getElementById("city").value
    city = cities.find(({ value }) => value === userCity)
    fetchWeather(city)
}

// function to fetch weather data for user selected city 
const fetchWeather = async(city) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=30c0377bc9ea487780553312233112&q=${city.lat},${city.lon}&days=3&aqi=yes`;
    clearDiv()
    try {
        const response = await fetch(url);
        const result = await response.json();
        displayWeather(result)
    } catch (error) {
        console.error(error);
    }
}

// function to clear any previous results
const clearDiv = () => {
    const myNode = document.getElementById("weather");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
}

// function to display weather results
const displayWeather = (data) => {
    // console.log(data)
    let weatherHTML = `
    <div class="current-weather-container">
        <h2 id="location">${data.location.name}</h2>
        <span class="outer-temp">
            <p id="temp" class="inline">${data.current.temp_c}</p>
            <span class="inner-temp">
                <p class="inline">°C</p>
                <p class="inline">${data.current.condition.text}</p>
            </span>
        </span>
        <p>Mon ${Math.trunc(data.forecast.forecastday[0].day.maxtemp_c)}° / ${Math.trunc(data.forecast.forecastday[0].day.mintemp_c)}°</p>
        <p>Air quality: ${Math.trunc(data.current.air_quality.pm2_5)} - ${airQuality(data.current.air_quality.pm2_5)}</p>
    </div>
    <div class="hourly-forecast-container container">
        <div class="hourly-forecast">
            Now
            <img src="${data.forecast.forecastday[0].hour[10].condition.icon}">
            
            ${Math.trunc(data.forecast.forecastday[0].hour[10].temp_c)}
        </div>
        <div class="hourly-forecast flex-column">
            11:00am
            <img src="${data.forecast.forecastday[0].hour[11].condition.icon}">
            ${Math.trunc(data.forecast.forecastday[0].hour[11].temp_c)}
        </div>
        <div class="hourly-forecast flex-column">
            12:00pm
            <img src="${data.forecast.forecastday[0].hour[12].condition.icon}">
            ${Math.trunc(data.forecast.forecastday[0].hour[12].temp_c)}
        </div>
        <div class="hourly-forecast flex-column">
            1:00pm
            <img src="${data.forecast.forecastday[0].hour[13].condition.icon}">
            ${Math.trunc(data.forecast.forecastday[0].hour[13].temp_c)}
        </div>
        <div class="hourly-forecast flex-column">
            2:00pm
            <img src="${data.forecast.forecastday[0].hour[14].condition.icon}">
            ${Math.trunc(data.forecast.forecastday[0].hour[14].temp_c)}
        </div>
    </div>
    <div class="three-day-forcast-container container">
        <div class="day-forcast">
            <p>Today</p>
            <img src=${data.forecast.forecastday[0].day.condition.icon}>
            <p>${data.forecast.forecastday[0].day.condition.text}</p>
            <span>${Math.trunc(data.forecast.forecastday[0].day.maxtemp_c)}° / ${Math.trunc(data.forecast.forecastday[0].day.mintemp_c)}°</span>
        </div>
        <div class="day-forcast">
            <p>Thu</p>
            <img src=${data.forecast.forecastday[0].day.condition.icon}>
            <p>${data.forecast.forecastday[1].day.condition.text}</p>
            <span>${Math.trunc(data.forecast.forecastday[1].day.maxtemp_c)}° / ${Math.trunc(data.forecast.forecastday[1].day.mintemp_c)}°</span>
        </div>
        <div class="day-forcast">
            <p>Fri</p>
            <img src=${data.forecast.forecastday[0].day.condition.icon}>
            <p>${data.forecast.forecastday[2].day.condition.text}</p>
            <span>${Math.trunc(data.forecast.forecastday[2].day.maxtemp_c)}° / ${Math.trunc(data.forecast.forecastday[2].day.mintemp_c)}°</span>
        </div>
    </div>
    <div class="aqi container">
        <i class="fa-solid fa-paper-plane"></i>
        <Span>Air quality</Span>
        <p>${airQuality(data.current.air_quality.pm2_5)} ${Math.trunc(data.current.air_quality.pm2_5)}</p>
    </div>
    <p id="details-title">Weather details</p>
    <div class="weather-details-container">
        <div class="details-container">
            <i class="fa-solid fa-temperature-half"></i>
            <p>Feels like</p>
            <p>${Math.trunc(data.current.feelslike_c)}°</p>
        </div>
        <div class="details-container">
            <i class="fa-solid fa-wind"></i>
            <p>${data.current.wind_dir} wind</p>
            <p>${data.current.wind_kph} km/h</p>
        </div>
        <div class="details-container">
            <i class="fa-solid fa-droplet"></i>
            <p>Humidity</p>
            <p>${data.current.humidity}%</p>
        </div>
        <div class="details-container">
            <i class="fa-solid fa-sun"></i>
            <p>UV</p>
            <p>${data.current.uv} Weak</p>
        </div>
        <div class="details-container">
            <i class="fa-solid fa-eye"></i>
            <p>Visibility</p>
            <p>${data.current.vis_km} km</p>
        </div>
        <div class="details-container">
            <i class="fa-solid fa-water"></i>
            <p>Air pressure</p>
            <p>${data.current.pressure_mb} hPa</p>
        </div>
        <div class="details-container" id="sunset-sunrise">
            <div id="sunrise">
                <i class="fa-solid fa-sun"></i>
                <p>Sunrise</p>
                <p>${data.forecast.forecastday[0].astro.sunrise}</p>            
            </div>
            <div id="sunset">
                <i class="fa-solid fa-moon"></i>
                <p>Sunset</p>
                <p>${data.forecast.forecastday[0].astro.sunset}</p>
            </div>
        </div>
    </div>

    `
    let elem = document.getElementById("weather")
    elem.innerHTML += weatherHTML
}