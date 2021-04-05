import './App.css';
import {Button} from 'react-bootstrap'; 

function App() {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        console.log(data.coords);
      }, (err) => {console.log(err)});
    }
  }
  return (
    <div className="App">
      <Button onClick={getLocation}>
        Get Location
      </Button>
    </div>
  );
}

export default App;
