import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, WiCloudy, WiShowers, WiDayRain, WiNightAltRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
        case "01d":
          return <WiDaySunny color="#FFD700" />; // Bright yellow for sunny
        case "01n":
          return <WiNightClear color="#4682B4" />; // Steel blue for clear night
        case "02d":
          return <WiDayCloudy color="#87CEEB" />; // Sky blue for cloudy day
        case "02n":
          return <WiNightAltCloudy color="#708090" />; // Slate gray for cloudy night
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          return <WiCloudy color="#B0C4DE" />; // Light steel blue for clouds
        case "09d":
        case "09n":
          return <WiShowers color="#4682B4" />; // Steel blue for showers
        case "10d":
          return <WiDayRain color="#6495ED" />; // Cornflower blue for daytime rain
        case "10n":
          return <WiNightAltRain color="#1E90FF" />; // Dodger blue for nighttime rain
        case "11d":
        case "11n":
          return <WiThunderstorm color="#4169E1" />; // Royal blue for thunderstorm
        case "13d":
        case "13n":
          return <WiSnow color="#87CEEB" />; // Sky blue for snow
        case "50d":
        case "50n":
          return <WiFog color="#A9A9A9" />; // Dark gray for fog
        default:
          return null;
    }
};

export default getWeatherIcon;
