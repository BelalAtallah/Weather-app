import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICurrentWeather, IWeatherForecast, WeatherUnit } from '../models'; // Update this import based on your folder structure
import { getCurrentWeather, getFiveDayForecast } from '../services';

interface WeatherState {
    currentWeather: ICurrentWeather | null;
    forecast: IWeatherForecast | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: null,
    forecast: null,
    status: 'idle',
    error: null,
};

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (params: { city: string; unit: WeatherUnit }, thunkAPI) => {
        try {
            const currentWeather = await getCurrentWeather(params.city, params.unit);
            const fiveDayForecast = await getFiveDayForecast(params.city, params.unit);
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
                state.forecast = action.payload.forecast;
                state.error = null;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default weatherSlice.reducer;
