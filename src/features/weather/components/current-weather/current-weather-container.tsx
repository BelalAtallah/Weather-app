import React from "react";
import { useWeather, useWeatherUnit } from "../../hooks";
import { CurrentWeather } from "./current-weather";

export const CurrentWeatherContainer: React.FC = () => {
  const weather = useWeather();
  const unit = useWeatherUnit();

  return (
    <div>
      {weather.status === "loading" && <p>Loading...</p>}
      {weather.status === "failed" && <p>Error: {weather.error}</p>}
      {weather.status === "idle" && weather.currentWeather && (
        <CurrentWeather data={weather.currentWeather} unit={unit} />
      )}
    </div>
  );
};
