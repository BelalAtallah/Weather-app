import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "./slices/weather-slice";
import { SearchField } from "./components";
import { FiveDayForecast } from "./components/five-day-forecast/five-day-forecast";
import { CurrentWeather } from "./components/current-weather/current-weather";
import "./weather-component.css";
import { RootState } from "../../store/store";
import { setUnit } from "./slices/weather-unit-slice";
import { WeatherUnit } from "./models";
import { UnitDropdown } from "./components/unit-dropdown/unit-dropdown";
import { getCityBackground } from "./services";

export const WeatherComponent = () => {
  const dispatch = useDispatch<any>();
  const unit = useSelector((state: RootState) => state.weatherUnit);
  const weather = useSelector((state: RootState) => state.weather);
  const [cityBackgroundUrl, setCityBackgroundUrl] = useState<string>("");

  const handleSearch = (event: { name: string; id: number }) => {
    dispatch(fetchWeatherData({ city: event.name, unit }));
  };

  const handleSetUnit = (newUnit: WeatherUnit) => {
    dispatch(setUnit(newUnit));
  };

  useEffect(() => {
    const defaultCity = "dubai";
    dispatch(fetchWeatherData({ city: defaultCity, unit }));
  }, [dispatch, unit]);

  const getCityBackgroundImage = async (city: string) => {
    const response = await getCityBackground(city);
    setCityBackgroundUrl(response);
  };

  useEffect(() => {
    weather.currentWeather &&
      getCityBackgroundImage(weather.currentWeather.name);
  }, [weather]);

  return (
    <div
      className="weather-forecast"
      style={{
        backgroundImage: `url(${cityBackgroundUrl})`,
      }}
    >
      <div className="weather-forecast__side-view">
        <div className="header">
          <SearchField onSelectionChange={handleSearch} />
        </div>

        <div>
          <CurrentWeather />
        </div>
      </div>
      <div className="weather-forecast__main-view">
        <UnitDropdown unit={unit} onUnitChange={handleSetUnit} />
        <FiveDayForecast />
      </div>
    </div>
  );
};
