import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import { WEATHER_API_CONTEXT } from '../Utils/globalConstants'

const initialState = {
  weather: {},
  status: 'idle',
  error: null
}
const sliceName = 'weather'

export const getCurrentLocationWeather = createAsyncThunk(
  `${sliceName}/getCurrentLocationWeather`,
  async ({ lat, lon }) => {
    // baseUrl can also be part of the env config if needed.
    const baseUrl = `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_BASE_URL}${WEATHER_API_CONTEXT}`
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
    const fullUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
    // Can create a request handler proxy to create axios instance at one place
    // and reuse it everywhere it is needed.
    const response = await axios.get(fullUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // TODO: need to remove console.log
    console.log(response, 'response from open weather');
    return response.data
})

export const weatherSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // TODO: data massaging for weather data can go in here
    // weatherDataAdded(state, action) {
    //   state.weather = action.payload;
    // },
  },
  extraReducers: {
    [getCurrentLocationWeather.pending]: (state) => {
      state.status = 'loading'
    },
    [getCurrentLocationWeather.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.weather = action.payload;
    },
    [getCurrentLocationWeather.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
});

// export const { weatherDataAdded } = weatherSlice.actions;

export default weatherSlice.reducer;

// state getters
export const getWeatherApiStatus = (state) => state.weather.status
export const selectAllInfo = (state) => state.weather.weather
