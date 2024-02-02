import React, { useState } from "react";
import "./WeatherInput.css";

const WeatherInput = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="maininput">
      <h2>Enter City Name</h2>
      <div>
        <input
          type="text"
          placeholder="E.g Delhi, Bangalore, Rio"
          value={city}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default WeatherInput;
