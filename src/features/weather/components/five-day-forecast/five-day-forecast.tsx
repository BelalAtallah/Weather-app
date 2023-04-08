import React from "react";
import { IWeatherForecastList } from "../../models";
import cloudy from "@assets/cloudy.png";
import partlyCloudy from "@assets/partly-cloudy.png";
import rain from "@assets/rainy.png";
import snowy from "@assets/snowy.png";
import sunny from "@assets/sunny.png";
import stormy from "@assets/stormy.png";
import { useWeather, useWeatherUnit } from "../../hooks";
import "./five-day-forecast.css";

const weatherIconMap = {
  Clouds: partlyCloudy,
  Sunny: sunny,
  Clear: sunny,
  Rain: rain,
  Overcast: cloudy,
  Snow: snowy,
  thunder: stormy,
};

const getIcon = (weather: keyof typeof weatherIconMap) => {
  return weatherIconMap[weather] || weatherIconMap.Clouds;
};

const FiveDayForecastComponent = () => {
  const weather = useWeather();
  const unit = useWeatherUnit();

  const renderForecastItem = (forecast: IWeatherForecastList) => {
    const getFormattedDate = (date: number) => {
      return new Date(date * 1000).toDateString();
    };

    const date = getFormattedDate(forecast.dt);
    const temperature = forecast.main.temp;

    return (
      <div key={forecast.dt} className="forecast-item">
        <h4>{date}</h4>

        <img
          src={getIcon(forecast.weather[0].main as keyof typeof weatherIconMap)}
          alt={"test"}
        />

        <p>
          {temperature} {unit === "metric" ? "°C" : "°F"}
        </p>
      </div>
    );
  };

  return (
    <div className="forecast-container">
      {weather.status === "loading" && <p>Loading...</p>}
      {weather.status === "failed" && <p>Error: {weather.error}</p>}
      {weather.status === "idle" &&
        weather.forecast &&
        weather.forecast.map(renderForecastItem)}
    </div>
  );
};
export const FiveDayForecast = React.memo(FiveDayForecastComponent);
