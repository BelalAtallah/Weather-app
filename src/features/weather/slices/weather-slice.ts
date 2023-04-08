import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICurrentWeather, IWeatherForecastList, WeatherUnit } from '../models';
import { getCurrentWeather, getFiveDayForecast } from '../services';

export interface WeatherState {
    currentWeather: ICurrentWeather | null;
    forecast: IWeatherForecastList[] | [];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: null,
    forecast: [],
    status: 'idle',
    error: null,
};

// Create an async thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (params: { city: string; unit: WeatherUnit }, thunkAPI) => {
        try {
            // Fetch current weather and five-day forecast
            const [currentWeather, fiveDayForecast] = await Promise.all([
                getCurrentWeather(params.city, params.unit),
                getFiveDayForecast(params.city, params.unit),
            ]);

            return { currentWeather, forecast: { list: fiveDayForecast } };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentWeather = action.payload.currentWeather;
                state.forecast = action.payload.forecast.list;
                state.error = null;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default weatherSlice.reducer;
