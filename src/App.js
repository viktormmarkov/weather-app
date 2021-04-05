import './App.css';
import {Button} from 'react-bootstrap'; 
import { useState } from 'react';
import weatherService from './services/WeatherService';

function App() {
  const [coordinates, setCoordinates] = useState({});
  const [cityDetails, setCityDetails] = useState({});
  const [weatherData, setWeatherData] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocationCoordinates, (err) => {console.log(err)});
    }
  }

  const setLocationCoordinates = (data) => {
    const newCoords = {lat: data.coords.latitude, lon: data.coords.longitude};
    setCoordinates({lat: data.coords.latitude, lon: data.coords.longitude});
    weatherService.getData(newCoords).then(response => {
      console.log(response);
      setCityDetails(response.data.city);
      setWeatherData(response.data.list);
    });
  }

  return (
    <div className="container">
      <CityDetails details={cityDetails}></CityDetails>
      {coordinates.lat} {coordinates.lon}
      <Button onClick={getLocation}>
        Get Location
      </Button>
    </div>
  );
}

function CityDetails({details}) {
  return (<>
    <h1>{details.name || 'serbia'}</h1>
  </>)
}

export default App;
