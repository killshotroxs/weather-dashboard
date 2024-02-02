import React, { useState } from 'react';
import "./WeatherDashboard.css"

const WeatherDashboard = ({ onToggleUnit }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
    onToggleUnit(!isCelsius);
  };

  return (
    <div className='dashboard'>
      <h2>Weather Dashboard</h2>
      <label>
        Celsius
        <input type="radio" name="unit" checked={isCelsius} onChange={handleToggleUnit} />
      </label>
      <label>
        Fahrenheit
        <input type="radio" name="unit" checked={!isCelsius} onChange={handleToggleUnit} />
      </label>
    </div>
  );
};

export default WeatherDashboard;
