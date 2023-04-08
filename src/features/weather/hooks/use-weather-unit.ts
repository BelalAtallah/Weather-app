import { useSelector } from "react-redux";
import { RootState } from "@store";
import { WeatherUnit } from "../models";

export const useWeatherUnit = (): WeatherUnit => {
    const unit = useSelector((state: RootState) => state.weatherUnit);
    return unit;
};