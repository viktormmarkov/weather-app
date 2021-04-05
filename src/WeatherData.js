import { useState } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import { Tab, Tabs, Row, Col } from "react-bootstrap";

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
      {_.keys(weatherDataGrouped).map((d) => (
        <Tab title={getTabName(d)} eventKey={d} key={d}>
          <WeatherDataDetails weatherDataDetails={weatherDataGrouped[d]}></WeatherDataDetails>
        </Tab>
      ))}
    </Tabs>
  );
}

function WeatherDataDetails({ weatherDataDetails }) {
  const tempMin = _(weatherDataDetails).map(d => d.main.temp_min).min();
  const tempMax = _(weatherDataDetails).map(d => d.main.temp_max).max();
  return (
    <>
      <Row>
        <Col>
          <h3>Daily</h3>
          <hr></hr>
          <span>{Math.round(tempMin)}° | {Math.round(tempMax)}°</span>
        </Col>
        <Col>
          <h3>Hourly</h3>
          <hr></hr>

        </Col>
      </Row>
    </>
  );
}

export default WeatherData;
