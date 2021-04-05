import './App.css';
import {Button} from 'react-bootstrap'; 
import { useState } from 'react';
import weatherService from './services/WeatherService';

function App() {
  const [coordinates, setCoordinates] = useState({});
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const newCoords = {lat: data.coords.latitude, lon: data.coords.longitude};
        setCoordinates({lat: data.coords.latitude, lon: data.coords.longitude});
        weatherService.getData(newCoords).then(response => {
          console.log(response.data);
        });
      }, (err) => {console.log(err)});
    }
  }
  return (
    <div className="App">
      {coordinates.lat} {coordinates.lon}
      <Button onClick={getLocation}>
        Get Location
      </Button>
    </div>
  );
}

export default App;
