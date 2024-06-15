import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import './mapdisplay.css';

// Fix the default icon issue with leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapDisplay = ({ latitude, longitude, setLatitude, setLongitude, zoom }) => {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (e.originalEvent.shiftKey) { // Check if Shift key is pressed
          const { lat, lng } = e.latlng;
          setPosition([lat, lng]);
          setLatitude(lat);
          setLongitude(lng);
        }
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoom} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}></Marker>
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
