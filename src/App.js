import "./App.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import weatherService from "./services/WeatherService";
import WeatherData from './WeatherData';


function App() {
  const [coordinates, setCoordinates] = useState({lat: undefined, lon:undefined});
  const [cityDetails, setCityDetails] = useState({name: 'Not selected'});
  const [weatherData, setWeatherData] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setLocationCoordinates,
        (err) => {
          console.log('Something went wrong with geolocation');
        }
      );
    }
  };

  const setLocationCoordinates = (data) => {
    const newCoords = { lat: data.coords.latitude, lon: data.coords.longitude };
    setCoordinates(newCoords);
  };

  useEffect(() => {
    weatherService.getData(coordinates).then((response) => {
      setCityDetails(response.data.city);
      setWeatherData(response.data.list);
    }, (err) => {console.log('errr')});
  }, [coordinates, coordinates.lat, coordinates.lon]);


  return (
    <div className="container">
      <CityDetails details={cityDetails}></CityDetails>
      <WeatherData weatherData={weatherData}></WeatherData>
      <Button onClick={getLocation} data-testid="get_location_button">Get Location</Button>
    </div>
  );
}

function CityDetails({ details }) {
  return (
    <>
      <h1 data-testid="city_name">{details.name || "Not selected"}</h1>
      <p><span data-testid="city_lat">{details?.coord?.lat}</span> <span data-testid="city_lon">{details?.coord?.lon}</span></p>
    </>
  );
}

export default App;
