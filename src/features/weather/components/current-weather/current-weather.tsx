import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import "./current-weather.css";
import { formatDate } from "../../../../utils/date-format";

export const CurrentWeather: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);
  const unit = useSelector((state: RootState) => state.weatherUnit);

  const getFormattedDate = (date: number) => {
    return formatDate(new Date(date * 1000).toString());
  };

  return (
    <div className="current-weather">
      {weather.status === "loading" && <p>Loading...</p>}
      {weather.status === "failed" && <p>Error: {weather.error}</p>}
      {weather.status === "idle" && weather.currentWeather && (
        <>
          <p className="current-weather__country">
            Current Weather in {weather.currentWeather.name},{" "}
            {weather.currentWeather.sys.country}:
          </p>
          <img
            className="current-weather__icon"
            src={`http://openweathermap.org/img/wn/${weather.currentWeather.weather[0].icon}@2x.png`}
            alt={weather.currentWeather.weather[0].description}
          />

          <div className="current-weather__description">
            <p className="current-weather__temp">
              {weather.currentWeather.main.temp}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <p className="current-weather__date">
              {getFormattedDate(weather.currentWeather.dt)}
            </p>

            <p className="current-weather__date">
              {weather.currentWeather.weather[0].description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
