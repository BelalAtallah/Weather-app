import axios from "axios"
import { IWeatherForecast, WeatherUnit, ICurrentWeather, IWeatherForecastList } from "../models";

const API_PATH = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'bf8b4f5af08fed4bc905b37ed6f8b6eb';
const UNSPLASH_CLIENT_ID = "8OYGc1cZtEg6hefq0ki-VTzdFiNHOcxb0E_xJ_Amiyw";

/**
 * Generic request function for making API requests using axios.
 * @param url - The URL to make the request to.
 * @returns The data from the API response.
 */
const request = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

/**
 * Fetches the current weather data for a given city and unit.
 * @param city - The name of the city to fetch weather data for.
 * @param unit - The unit system to use (metric or imperial).
 * @returns A promise resolving to the current weather data.
 */
export const getCurrentWeather = async (
  city: string,
  unit: WeatherUnit
): Promise<ICurrentWeather> => {
  const url = `${API_PATH}/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
  return request(url);
};

/**
 * Fetches the five-day forecast data for a given city and unit.
 * @param city - The name of the city to fetch forecast data for.
 * @param unit - The unit system to use (metric or imperial).
 * @returns A promise resolving to an array of five daily forecast data objects.
 */
export const getFiveDayForecast = async (
  city: string,
  unit: WeatherUnit
): Promise<IWeatherForecastList[]> => {
  const url = `${API_PATH}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`;
  const data = (await request(url)) as IWeatherForecast;
  const fiveDayForecast = filterAndGroupDailyData(data.list);
  return fiveDayForecast;
};

/**
 * Fetches the background image of a city from the Unsplash API.
 * @param city - The name of the city to fetch the background image for.
 * @returns A promise resolving to the URL of the city background image.
 */
export const getCityBackground = async (city: string): Promise<string> => {
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_CLIENT_ID}&per_page=1`;
  const data = await request(url);
  return data.results[0].urls.regular;
};

/**
 * Filters and groups daily data from weather forecast data.
 * @param list - The array of weather forecast data.
 * @returns An array of five daily forecast data objects.
 */
const filterAndGroupDailyData = (
  list: IWeatherForecastList[]
): IWeatherForecastList[] => {
  const today = new Date().toISOString().split("T")[0];
  const dailyData: Record<string, IWeatherForecastList> = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (date !== today) {
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    }
  });

  return Object.values(dailyData).slice(0, 5);
};