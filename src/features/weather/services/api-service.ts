import axios from "axios"
import { IWeatherForecast, WeatherUnit, ICurrentWeather, IWeatherForecastList } from "../models";

const API_PATH = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'bf8b4f5af08fed4bc905b37ed6f8b6eb';


export const getCurrentWeather = async (city: string, unit: WeatherUnit): Promise<ICurrentWeather> => {
  const response = await axios.get(`${API_PATH}/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
  return response.data;
}

export const getFiveDayForecast = async (city: string, unit: WeatherUnit): Promise<IWeatherForecastList[]> => {
  const response = await axios.get(`${API_PATH}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`);
  const data = response.data as IWeatherForecast;
  const today = new Date().toISOString().split('T')[0];
  const dailyData: any = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    console.log({ today, date });

    if (date !== today) {
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    }
  });

  const fiveDayForecast = Object.values(dailyData).slice(0, 5) as IWeatherForecastList[];
  console.log({ fiveDayForecast })
  return fiveDayForecast;
}

export const getCityBackground = async (city: string): Promise<any> => {
  const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=8OYGc1cZtEg6hefq0ki-VTzdFiNHOcxb0E_xJ_Amiyw&per_page=1`);
  return response.data.results[0].urls.regular;
}