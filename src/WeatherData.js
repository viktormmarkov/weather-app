import { useState } from "react";
import { DateTime } from "luxon";
import _ from 'lodash';
import { Tab, Tabs } from "react-bootstrap";

function fromSecondsFormatted(seconds, format = DateTime.DATE_MED) {
  return DateTime.fromSeconds(seconds).toLocaleString(format)
}

function WeatherData({ weatherData = [] }) {
  const [key, setKey] = useState(weatherData[0]);
  const weatherDataGrouped = _.groupBy(weatherData, (data) => fromSecondsFormatted(data.dt));
  const getTabName = (tab) => {
    const firstForDay = weatherDataGrouped && weatherDataGrouped[tab] && weatherDataGrouped[tab][0];
    return firstForDay ? fromSecondsFormatted(firstForDay.dt): tab;
  };

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {_.keys(weatherDataGrouped).map((d) => (
        <Tab title={getTabName(d)} eventKey={d} key={d}>
        </Tab>
      ))}
    </Tabs>
  );
}

export default WeatherData;