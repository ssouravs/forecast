import React, { useState, useEffect } from "react";
import getWeatherIcon from '../utils/weatherIcons';
//import dotenv from 'dotenv'

//dotenv.config()
//const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const API_KEY="5dd3ab4b467da53d151f9791197228a5"

const WeatherDisplay = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit

  useEffect(() => {
    if (lat && lon) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchWeatherData();
    }
  }, [lat, lon, unit]);

  const toggleTemperatureUnit = () => {
    if (unit === 'metric') {
      setUnit('imperial');
      setTemperatureUnit('F');
    } else {
      setUnit('metric');
      setTemperatureUnit('C');
    }
  };

  if (error) return <div className="error-message">Error fetching weather data: {error}</div>;
  if (!weatherData) return <div className="loading-message">Loading...</div>;

  return (
    <div className="display-container">
      <h3>Weather Information</h3>
      <div className="weather-info">
        <p>
          <span className="label">Temperature:</span> {weatherData.main.temp} °{temperatureUnit}
        </p>
        <p>
          <span className="label">Condition:</span> {weatherData.weather[0].description}{" "}
          <span className="icon">{getWeatherIcon(weatherData.weather[0].icon)}</span>
        </p>
        <p>
          <span className="label">Humidity:</span> {weatherData.main.humidity}%
        </p>
        <p>
          <span className="label">Wind Speed:</span> {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
        </p>
        <p>
          <span className="label">Chance of Rain:</span> {weatherData.clouds.all}%
        </p>
      </div>
      <button onClick={toggleTemperatureUnit} className="toggle-button">
        Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDisplay;
