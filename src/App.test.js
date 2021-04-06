import {
  render,
  screen,
  findAllByTestId
} from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { mockData } from "./services/WeatherService.mock.data";

jest.mock("axios");

const mockResolve = (success) => {
  Promise.resolve(
    // dummy coordinates not used in the service call just to trigger 'fetching' of data
    success({
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    })
  )
}


describe("Application", async () => {
  it('should render the city details and call location api once', async () => {
    axios.get.mockImplementation(() => {return Promise.resolve({
      data: mockData,
    })});
  
    global.navigator.geolocation.getCurrentPosition.mockImplementation(mockResolve);
  
    act(() => {
      render(<App />);
    });
    const button = screen.getByTestId("get_location_button");
    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
  
  
    await screen.findByTestId("tab-0");
    const cityName = await screen.findByTestId("city_name");
    const cityLat = await screen.findByTestId("city_lat");
    const cityLon = await screen.findByTestId("city_lon");
    expect(cityName.innerHTML).toEqual("Sofia");
    expect(cityLat.innerHTML).toEqual("42.7331");
    expect(cityLon.innerHTML).toEqual("23.2933");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it('should render hour columns', async () => {
    axios.get.mockImplementation(() => {return Promise.resolve({data: mockData,})});
    global.navigator.geolocation.getCurrentPosition.mockImplementation(mockResolve);

    act(() => {
      render(<App />);
    });
    const button = screen.getByTestId("get_location_button");
    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    const tab = await screen.findByTestId("tab-0");
    const hourdetails = await findAllByTestId(tab, "hour-details");
    expect(hourdetails.length).toEqual(2);
  })
});
