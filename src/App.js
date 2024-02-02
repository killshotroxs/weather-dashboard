import React, { useState } from "react";
import "./App.css";
import WeatherInput from "./Components/WeatherInput/WeatherInput";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./Components/WeatherForecast/WeatherForecast";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setCity(city); 
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleToggleUnit = (isCelsius) => {
    setIsCelsius(isCelsius);
  };

  return (
    <div className="App">
      <WeatherDashboard onToggleUnit={handleToggleUnit} />
      <div className="UpperSection">
        <WeatherInput onSearch={fetchWeatherData} />
        <CurrentWeather weatherData={weatherData} isCelsius={isCelsius} />
      </div>
      <div className="weatherforecast">
        <WeatherForecast city={city} isCelsius={isCelsius} />
      </div>
    </div>
  );
}

export default App;
