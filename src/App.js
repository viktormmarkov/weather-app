import './App.css';
import {Button} from 'react-bootstrap'; 
import { useState } from 'react';

function App() {
  const [coordinates, setCoordinates] = useState({});
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        setCoordinates({lat: data.coords.latitude, lon: data.coords.longitude})
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
