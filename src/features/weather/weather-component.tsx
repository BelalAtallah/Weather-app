import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CurrentWeatherContainer,
  SearchField,
  FiveDayForecast,
  UnitDropdown,
} from "./components";
import { WeatherUnit } from "./models";
import { fetchWeatherData, setUnit } from "./slices";
import { useCityBackground, useWeather, useWeatherUnit } from "./hooks";
import "./weather-component.css";

export const WeatherComponent = () => {
  const dispatch = useDispatch<any>();
  const unit = useWeatherUnit();
  const weather = useWeather();

  const cityBackgroundUrl = useCityBackground(
    weather.currentWeather?.name || ""
  );

  const [selectedCity, setSelectedCity] = useState<string>("dubai");

  const handleSearch = (event: { name: string; id: number }) => {
    setSelectedCity(event.name);
    dispatch(fetchWeatherData({ city: event.name, unit }));
  };

  const handleSetUnit = (newUnit: WeatherUnit) => {
    dispatch(setUnit(newUnit));
  };

  useEffect(() => {
    dispatch(fetchWeatherData({ city: selectedCity, unit }));
  }, [dispatch, unit, selectedCity]);

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
        <CurrentWeatherContainer />
      </div>
      <div className="weather-forecast__main-view">
        <UnitDropdown unit={unit} onUnitChange={handleSetUnit} />
        <FiveDayForecast />
      </div>
    </div>
  );
};
