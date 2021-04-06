import { useState } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import {WindData, TempMinMax, Humidity} from './WeatherDataComponents';

function fromSecondsFormatted(seconds, format = DateTime.DATE_MED) {
  return DateTime.fromSeconds(seconds).toLocaleString(format);
}

function WeatherData({ weatherData = [] }) {
  const [key, setKey] = useState(weatherData[0]);
  const weatherDataGrouped = _.groupBy(weatherData, (data) =>
    fromSecondsFormatted(data.dt)
  );

  const getTabName = (tab) => {
    const firstForDay =
      weatherDataGrouped &&
      weatherDataGrouped[tab] &&
      weatherDataGrouped[tab][0];
    return firstForDay ? fromSecondsFormatted(firstForDay.dt) : tab;
  };

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {_.keys(weatherDataGrouped).map((d, i) => (
        <Tab title={getTabName(d)} eventKey={d} key={d} data-testid={`tab-${i}`}>
          <WeatherDataDetails
            weatherDataDetails={weatherDataGrouped[d]}
          ></WeatherDataDetails>
        </Tab>
      ))}
    </Tabs>
  );
}

function WeatherDataDetails({ weatherDataDetails }) {
  const tempMin = _(weatherDataDetails)
    .map((d) => d.main.temp_min)
    .min();
  const tempMax = _(weatherDataDetails)
    .map((d) => d.main.temp_max)
    .max();
  const dataCount = weatherDataDetails.length;
  const averageWindSpeed = _(weatherDataDetails).map((d) => d.wind.speed).sum() / dataCount;
  const averageHumidity = _(weatherDataDetails).map((d) => d.main.humidity).sum() / dataCount;

  return (
    <>
      <Row>
        <Col md={3} sm={12}>
          <h3>Daily</h3>
          <hr></hr>
          <div className="py-2">
            <h6>&nbsp;</h6>
            <div>Min / Max Temperature: <TempMinMax tempMin={tempMin} tempMax={tempMax} /></div>
            <div>Wind: <WindData details={{speed: averageWindSpeed}}/></div>
            <div>Humidity: <Humidity humidity={averageHumidity}/></div>
          </div>
        </Col>
        <Col>
          <h3>Hourly</h3>
          <hr></hr>
          <div>
            <Row>
              {weatherDataDetails.map((d,i) => (
                <HourDetails details={d} key={d.dt} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

function HourDetails({ details }) {
  return (
    <Col className="weather-data-column py-2" data-testid={`hour-details`}>
      <h6>
        {DateTime.fromSeconds(details.dt).toLocaleString(
          DateTime.TIME_24_SIMPLE
        )}
      </h6>
      <TempMinMax
        className="d-block"
        tempMin={details.main.temp_max}
        tempMax={details.main.temp_min}
      />
      <WindData className="d-block" details={details.wind}/>
      <Humidity className="d-block" humidity={details.main.humidity}/>
    </Col>
  );
}


export default WeatherData;
