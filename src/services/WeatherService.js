import axios  from "axios";
import { mockData } from './WeatherService.mock.data';

const API_BASE = "http://api.openweathermap.org/data";
const API_VERSION = "2.5";
const API_URL = `${API_BASE}/${API_VERSION}`;
class WeatherService {
  constructor() {
    this.defaultServiceParams = {
      appid: "4f751d5b21a82a961ae0933754db09cc",
      units: "metric",
    };
  }

  getData = ({lat, lon}) => {
    // return Promise.resolve({data:mockData});
    if (lat !== undefined && lon !== undefined) {
      return axios.get(`${API_URL}/forecast`, {
        params: { ...this.defaultServiceParams, lat, lon },
      });
    } else {
      return Promise.reject("No data provided");
    }
  };
}

const weatherService = new WeatherService();
export default weatherService;