import React from 'react';
//import './recentsearch.css';

const RecentSearch = ({ searchHistory, handleHistoryClick }) => {
  return (
    <div className="historyContainer">
      <h4>Recent Searches</h4>
      <ul className="searchHistory">
        {searchHistory.map((search, index) => (
          <li key={index} onClick={() => handleHistoryClick(search.lat, search.lon)}>
            Lat: {search.lat}, Lon: {search.lon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
