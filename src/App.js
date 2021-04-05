import "./App.css";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useState, useEffect } from "react";
import _ from "lodash";
import weatherService from "./services/WeatherService";
import WeatherData from './WeatherData';


function App() {
  const [coordinates, setCoordinates] = useState({});
  const [cityDetails, setCityDetails] = useState({});
  const [weatherData, setWeatherData] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setLocationCoordinates,
        (err) => {
          console.log(err);
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
    });
  }, [coordinates.lat, coordinates.lon]);

  return (
    <div className="container">
      <CityDetails details={cityDetails}></CityDetails>
      {coordinates.lat} {coordinates.lon}
      <WeatherData weatherData={weatherData}></WeatherData>
      <Button onClick={getLocation}>Get Location</Button>
    </div>
  );
}

function CityDetails({ details }) {
  return (
    <>
      <h1>{details.name || "Not selected"}</h1>
    </>
  );
}

export default App;
