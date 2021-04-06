import {
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";
import axios from "axios";
import {mockData} from "./services/WeatherService.mock.data";

jest.mock("axios");

test("renders learn react link", async () => {
  axios.get.mockImplementation(() => {return Promise.resolve({
    data: mockData,
  })});

  global.navigator.geolocation.getCurrentPosition.mockImplementation((success) =>
    Promise.resolve(
      // dummy coordinates not used in the service call.
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      })
    )
  );

  act(() => {
    render(<App />);
  });
  const button = screen.getByTestId("get_location_button");
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });


  await screen.queryAllByTestId("wind", {});
  const rowValues = await screen.findByTestId("city_name");

  expect(rowValues.innerHTML).toEqual("Sofia");
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
});
