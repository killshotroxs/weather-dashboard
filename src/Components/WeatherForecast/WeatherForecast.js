import React, { useState, useEffect } from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ city, isCelsius }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    if (city) {
      fetchForecastData();
    }
  }, [city]);

  if (!forecastData) {
    return <div>Enter City Name and click Search to Load Forecast...</div>;
  }

  
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const next8DaysForecast = [];
  let daysCount = 0;
  
  forecastData.list.forEach(forecast => {
    const forecastDate = new Date(forecast.dt_txt).toLocaleDateString('en-GB');
    if (daysCount < 5) {
      next8DaysForecast.push({ ...forecast, date: new Date(currentDate) });
      daysCount++;
      currentDate.setDate(currentDate.getDate() + 1); 
    }
  });

  return (
    <div className="forecast-container">
      <h2>5 Day Weather Forecast</h2>
      <div className="forecast-cards">
        {next8DaysForecast.map((forecast, index) => (
          <div className="forecast-card" key={index}>
            <h3>{forecast.date.toLocaleDateString('en-GB')}</h3> 
            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
            <p>Temperature: {isCelsius ? forecast.main.temp : ((forecast.main.temp * 9/5) + 32).toFixed(2)} {isCelsius ? '°C' : '°F'}</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
