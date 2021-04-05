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
function Temp ({temp}) {
  return (<span>{Math.round(temp)}°</span>)
}

function TempMinMax({tempMin, tempMax, className}) {
  return (<span className={className ? className : ''}><Temp temp={tempMin}/> | <Temp temp={tempMax}/> </span>)
}

function HourDetails({details, className}) {
  return (<Col>
    <h6>{DateTime.fromSeconds(details.dt).toLocaleString(DateTime.TIME_24_SIMPLE)}</h6>
    <TempMinMax className="d-block"tempMin={details.main.temp_min} tempMax={details.main.temp_max}/>
  </Col>)
}

function WeatherDataDetails({ weatherDataDetails }) {
  const tempMin = _(weatherDataDetails).map(d => d.main.temp_min).min();
  const tempMax = _(weatherDataDetails).map(d => d.main.temp_max).max();
  return (
    <>
      <Row>
        <Col md={4}>
          <h3>Daily</h3>
          <hr></hr>
          <div>
            <h6>&nbsp;</h6>
            <TempMinMax tempMin={tempMin} tempMax={tempMax}/>
          </div>
        </Col>
        <Col>
          <h3>Hourly</h3>
          <hr></hr>
          <div>
            <Row>
            {weatherDataDetails.map(d => (<HourDetails className="px-1" details={d}/>))}
          </Row>

          </div>
        </Col>
      </Row>
    </>
  );
}

export default WeatherData;
