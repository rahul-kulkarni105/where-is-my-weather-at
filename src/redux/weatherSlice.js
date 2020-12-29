import { requestHandler } from '../Utils/requestHandler'
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import {
  WEATHER_API_CONTEXT,
  WEATHER_ONECALL_API_CONTEXT
} from '../Utils/globalConstants'
import { getDates } from '../Utils/utils'

const initialState = {
  weather: {},
  status: 'idle',
  error: null,
  allWeather: {},
  allWeatherError: null,
  allWeatherStatus: 'idle',
}
const sliceName = 'weather'

export const getCurrentLocationWeather = createAsyncThunk(
  `${sliceName}/getCurrentLocationWeather`,
  async ({ lat, lon }) => {
    // baseUrl can also be part of the env config if needed.
    const baseUrl = `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_BASE_URL}${WEATHER_API_CONTEXT}`
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
    const fullUrl = `${baseUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    try {
      const response = await requestHandler({}).get(fullUrl)
      return response.data
    } catch(err) {
      console.log(err, 'error in open weather api')
      return err
    }
})

// Can make use of this one API call instead of two to get weather information
// for further refactoring.
export const getWeatherInOneCall = createAsyncThunk(
  `${sliceName}/getWeatherInOneCall`,
  async ({ lat, lon }) => {
    // baseUrl can also be part of the env config if needed.
    const baseUrl = `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_BASE_URL}${WEATHER_ONECALL_API_CONTEXT}`
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
    const fullUrl = `${baseUrl}?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=${apiKey}`
    try {
      const response = await requestHandler({}).get(fullUrl)
      return response.data
    } catch(err) {
      console.log(err, 'error in open weather oneCall api')
      return err
    }
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
    [getWeatherInOneCall.pending]: (state) => {
      state.allWeatherStatus = 'loading'
    },
    [getWeatherInOneCall.fulfilled]: (state, action) => {
      state.allWeatherStatus = 'succeeded'
      state.allWeather = action.payload;
    },
    [getWeatherInOneCall.rejected]: (state, action) => {
      state.allWeatherStatus = 'failed'
      state.allWeatherError = action.payload
    },
  },
});

// export const { weatherDataAdded } = weatherSlice.actions;

export default weatherSlice.reducer;

// state getters
export const getWeatherApiStatus = (state) => state.weather.status
export const selectAllInfo = (state) => state.weather.weather
export const getWeatherDescription = ({
  weather: {
    weather: {
      weather = []
    }
  }
}) => {
  const weatherDescription = weather.map(slug => slug.description) || ''
  return weatherDescription;
}
export const getTemperatureInfo = ({
  weather: {
    weather: {
      main = {}
    }
  }
}) => main
export const getAllWeatherApiStatus = (state) => state.weather.allWeatherStatus
export const selectAllWeatherInfo = (state) => state.weather.allWeather
export const weeklyWeatherInfo = ({
  weather: {
    allWeather: {
      daily = [],
    }
  }
}) => {
  const daysWeek = getDates()
  const formatDailyWeather = daily.map(
    (day, index) => ({
      dayOfTheWeek: daysWeek[index],
      maxTemp: day.temp.max,
      minTemp: day.temp.min
    }))
  return formatDailyWeather;
}
