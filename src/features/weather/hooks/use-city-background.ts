import { useEffect, useState } from "react";
import { getCityBackground } from "../services";

export const useCityBackground = (city: string) => {
    const [cityBackgroundUrl, setCityBackgroundUrl] = useState<string>("");
  
    useEffect(() => {
      const fetchCityBackgroundImage = async (city: string) => {
        const response = await getCityBackground(city);
        setCityBackgroundUrl(response);
      };
  
      fetchCityBackgroundImage(city);
    }, [city]);
  
    return cityBackgroundUrl;
  };