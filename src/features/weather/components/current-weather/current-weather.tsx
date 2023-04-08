import React from "react";
import { formatDate } from "@utils";
import { ICurrentWeather } from "../../models";
import styles from "./current-weather.module.css";

interface ICurrentWeatherProps {
  data: ICurrentWeather | null;
  unit: string;
}

const CurrentWeatherComponent: React.FC<ICurrentWeatherProps> = ({
  data,
  unit,
}) => {
  const getFormattedDate = (date: number) => {
    return formatDate(new Date(date * 1000).toString());
  };

  return (
    <div className={styles.currentWeather}>
      {data && (
        <>
          <p className={styles.country}>
            Current Weather in {data.name}, {data.sys.country}:
          </p>
          <img
            className={styles.icon}
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />

          <div className={styles.description}>
            <p className={styles.temp}>
              {data.main.temp} {unit === "metric" ? "°C" : "°F"}
            </p>

            <p className={styles.date}>{getFormattedDate(data.dt)}</p>

            <p className={styles.weatherDescription}>
              {data.weather[0].description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const areEqual = (
  prevProps: ICurrentWeatherProps,
  nextProps: ICurrentWeatherProps
) => {
  return prevProps.data === nextProps.data && prevProps.unit === nextProps.unit;
};

export const CurrentWeather = React.memo(CurrentWeatherComponent, areEqual);
