import { useSelector } from "react-redux";
import { IWeatherForecastList } from "../../models";
import { RootState } from "../../../../store/store";
import { formatDate } from "../../../../utils/date-format";

import "./five-day-forecast.css";

import cloudy from "../../../../assets/cloudy.png";
import partlyCloudy from "../../../../assets/partly-cloudy.png";
import rain from "../../../../assets/rainy.png";
import snowy from "../../../../assets/snowy.png";
import sunny from "../../../../assets/sunny.png";
import stormy from "../../../../assets/stormy.png";

export const FiveDayForecast = () => {
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

  const weather = useSelector((state: RootState) => state.weather);
  const unit = useSelector((state: RootState) => state.weatherUnit);

  const renderForecastItem = (forecast: IWeatherForecastList) => {
    const getFormattedDate = (date: number) => {
      return formatDate(new Date(date * 1000).toString());
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
      {weather.forecast && weather.forecast.list.map(renderForecastItem)}
    </div>
  );
};
