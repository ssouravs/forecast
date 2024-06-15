import React, { useState } from 'react';
//import './weatherform.css';

const WeatherForm = ({ handleSubmit, inputLat, setInputLat, inputLon, setInputLon }) => {
  const [error, setError] = useState('');

  const validateInputs = () => {
    const lat = parseFloat(inputLat);
    const lon = parseFloat(inputLon);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setError('Please enter a valid latitude between -90 and 90.');
      return false;
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
      setError('Please enter a valid longitude between -180 and 180.');
      return false;
    }

    setError('');
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit} className="form">
        <div className="input-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            type="text"
            value={inputLat}
            onChange={(e) => setInputLat(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            type="text"
            value={inputLon}
            onChange={(e) => setInputLon(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Get Weather
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default WeatherForm;
