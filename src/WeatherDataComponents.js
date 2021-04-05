export function Humidity({ humidity, className = "" }) {
  return <span className={className}>{humidity.toFixed(2)}%</span>;
}

export function WindData({ details = { speed: 0 }, className = "" }) {
  return (
    <span className={className} data-testid="wind">
      {details && details.speed && details.speed.toFixed(2) || "-" } m/s
    </span>
  );
}

export function TempMinMax({ tempMin, tempMax, className }) {
  return (
    <span className={className ? className : ""}>
      <Temp temp={tempMin} /> | <Temp temp={tempMax} />{" "}
    </span>
  );
}

export function Temp({ temp }) {
  return <span>{Math.round(temp)}°</span>;
}
