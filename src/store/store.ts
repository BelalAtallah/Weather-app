import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/slices/weather-slice';
import weatherUnitReducer from '../features/weather/slices/weather-unit-slice'; // Import the weather unit reducer

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weatherUnit: weatherUnitReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;