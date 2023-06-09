export interface IWeatherForecast {
    cod: string
    message: number
    cnt: number
    list: IWeatherForecastList[]
    city: City
}

export interface IWeatherForecastList {
    dt: number
    main: Main
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    sys: Sys
    dt_txt: string
}

interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

interface Clouds {
    all: number
}

interface Sys {
    pod: string
}

interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

interface Wind {
    speed: number
    deg: number
    gust: number
}

interface City {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

interface Coord {
    lat: number
    lon: number
}