import { useState, useEffect } from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import RecentSearch from './components/RecentSearch';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [inputLat, setInputLat] = useState('');
  const [inputLon, setInputLon] = useState('');
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);
  const [zoom, setZoom] = useState(13);
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputLat && inputLon) {
      const newLatitude = parseFloat(inputLat);
      const newLongitude = parseFloat(inputLon);
      setLatitude(newLatitude);
      setLongitude(newLongitude);

      const newSearch = { lat: newLatitude, lon: newLongitude };
      const updatedHistory = [...searchHistory, newSearch].slice(-5); // Keep only the last 5 searches
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleHistoryClick = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <span className='title'>Weather Forecast</span>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdOutlineDarkMode style={{height:"2rem",width:"2rem"}}/>  : <MdDarkMode style={{height:"2rem",width:"2rem"}}/>}
      </button>
      <div className='display'>
      <div className="formContainer">
        <WeatherForm
          handleSubmit={handleSubmit}
          inputLat={inputLat}
          setInputLat={setInputLat}
          inputLon={inputLon}
          setInputLon={setInputLon}
        />
      </div>
        <div className="weatherDisplay">
          <WeatherDisplay lat={latitude} lon={longitude} />
        </div>
      </div>
      <RecentSearch
        searchHistory={searchHistory}
        handleHistoryClick={handleHistoryClick}
      />
      <div className="mapDisplay">
        <MapDisplay
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          zoom={zoom}
        />
      </div>
    </div>
  );
}

export default App;
