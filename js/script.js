import * as domElements from 'js/dom.js';
import {Http} from 'js/http.js';
import {WeatherData, weatherProxyHandler} from 'js/convert.js';

const app_id = '7cadaddb01307afac58eb68ebec1e7ba';
domElements.getWeather.addEventListener('click', searchWeather);

function searchWeather() {
    const city = domElements.getCityName.value.trim();
    if (city.length == 0) {
        return alert('Please enter a city name');
    }
    domElements.weatherCard.style.display = 'none';
      const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + app_id;
      Http.fetchData(url)
        .then(responseData => {
            const weatherData = new WeatherData(city, responseData.weather[0].description.toUpperCase());
            const weatherProxy = new Proxy(weatherData, weatherProxyHandler);
            weatherProxy.temperature = responseData.main.temp;
            updateWeather(weatherProxy);
        })
        .catch(error => alert(error));
}

function updateWeather(weatherData) {
    console.log(weatherData);
    domElements.weatherCardTitle.textContent = "Weather For " + weatherData.cityName;
    domElements.weatherDescription.textContent = weatherData.description;
    domElements.weatherTemp.textContent = weatherData.temperature;
    domElements.weatherCard.style.display = 'block';
}
