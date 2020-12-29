import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentWeather: {},
  status: 'idle',
  error: null
}

export const getCurrentLocationWeather = createAsyncThunk(
  'weather/getCurrentLocationWeather',
  async () => {
    // baseUrl can also be part of the env config if needed.
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    //TODO: need to get the lat and lon form geolocation API
    const lat = '30.2963579';
    const lon = '-97.73907';
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
  name: 'weather',
  initialState,
  reducers: {
    // TODO: data massaging for weather data can go in here
    // weatherDataAdded(state, action) {
    //   state.currentWeather = action.payload;
    // },
  },
  extraReducers: {
    [getCurrentLocationWeather.pending]: (state) => {
      state.status = 'loading'
    },
    [getCurrentLocationWeather.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentWeather = action.payload;
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
export const getApiStatus = (state) => state.weather.status
export const selectAllInfo = (state) => state.weather.currentWeather
