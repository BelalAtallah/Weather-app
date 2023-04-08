import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherUnit } from '../models';

const initialState: WeatherUnit = 'metric';

const weatherUnitSlice = createSlice<WeatherUnit, any, 'weatherUnit'>({
  name: 'weatherUnit',
  initialState,
  reducers: {
    setUnit: (_state: any, action: PayloadAction<WeatherUnit>) => {
      return action.payload;
    },
  },
});

export const { setUnit } = weatherUnitSlice.actions;
export default weatherUnitSlice.reducer;


