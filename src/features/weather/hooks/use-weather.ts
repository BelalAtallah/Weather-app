import { useSelector } from "react-redux";
import { RootState } from "@store";
import { WeatherState } from "../slices";

export const useWeather = (): WeatherState => {
  const weather = useSelector((state: RootState) => state.weather);
  return weather;
};