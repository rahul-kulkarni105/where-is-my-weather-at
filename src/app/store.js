import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../redux/openWeather';

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
