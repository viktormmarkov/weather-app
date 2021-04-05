import axios  from "axios";
import { mockData } from './WeatherService.mock.data';

const API_BASE = "http://api.openweathermap.org/data";
const API_VERSION = "2.5";
const axiosInstance = axios.create({
  baseURL: `${API_BASE}/${API_VERSION}`,
});

class WeatherService {
  constructor() {
    this.defaultServiceParams = {
      appid: "4f751d5b21a82a961ae0933754db09cc",
      units: "metric",
    };
  }

  getData = (coordinates) => {
    return Promise.resolve({data:mockData});
    if (coordinates.lat && coordinates.lon) {
      return axiosInstance.get(`/forecast`, {
        params: { ...this.defaultServiceParams, ...coordinates },
      });
    } else {
      return Promise.reject("No data provided");
    }
  };
}

const weatherService = new WeatherService();
export default weatherService;