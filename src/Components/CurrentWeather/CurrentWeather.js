import React from 'react';
import "./CurrentWeather.css"

const CurrentWeather = ({ weatherData, isCelsius }) => {
  if (!weatherData) {
    return (
      <div>
        <h2>Current Weather</h2>
        <p>Please enter a city and click Search</p>
      </div>
    );
  }

  const { name, main, wind, weather } = weatherData;
  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;
  const temperature = isCelsius ? main.temp : (main.temp * 9/5) + 32; // Convert temperature to Fahrenheit if isCelsius is false
  const minTemperature = isCelsius ? main.temp_min : (main.temp_min * 9/5) + 32; // Convert temperature to Fahrenheit if isCelsius is false
  const maxTemperature = isCelsius ? main.temp_max : (main.temp_max * 9/5) + 32; // Convert temperature to Fahrenheit if isCelsius is false
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const windDirection = wind.deg;

  // Function to convert wind direction in degrees to cardinal direction
  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className='currentweather'>
      <h2>Current Weather</h2>
      <div>
        <div className='upperweatherdata'>
          <h3>{name} ({weatherDescription})</h3>
          <img src={`http://openweathermap.org/img/wn/${iconCode}.png`} alt="Weather Icon"/>
        </div>
        <p>Temperature: {temperature.toFixed(2)} {isCelsius ? '°C' : '°F'}</p>
        <p>Min Temperature: {minTemperature.toFixed(2)} {isCelsius ? '°C' : '°F'}</p>
        <p>Max Temperature: {maxTemperature.toFixed(2)} {isCelsius ? '°C' : '°F'}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} m/s {getWindDirection(windDirection)}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
