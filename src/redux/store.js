import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import addressReducer from './addressSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    address: addressReducer,
  },
});
