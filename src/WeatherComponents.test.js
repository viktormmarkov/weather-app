import { render, screen } from '@testing-library/react';
import App from './App';
import {WindData, TempMinMax, Humidity} from './WeatherDataComponents';

describe('correct formatting of thata', () => {
  it('should not explode', () => {
    render(<WindData details={{speed: undefined}} />);
    const [windElem] = screen.getAllByTestId('wind');
    expect(windElem.innerHTML).toEqual('- m/s');
  })
  it('should add zeroes even if the number is whole', () => {
    render(<WindData details={{speed: 14}} />);
    const [windElem] = screen.getAllByTestId('wind');
    expect(windElem.innerHTML).toEqual('14.00 m/s');
  })

  it('should round numbers to 2 digits after the decimal point', () => {
    render(<WindData details={{speed: 14.23232323}} />);
    const [windElem] = screen.getAllByTestId('wind');
    expect(windElem.innerHTML).toEqual('14.23 m/s');
  })
});
