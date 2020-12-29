import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import {
  OPEN_CAGE_API_CONTEXT,
  COMMON_HEADERS
} from '../Utils/globalConstants'

const initialState = {
  address: {},
  status: 'idle',
  error: null
}
const sliceName = 'address'

export const getCurrentLocationAddress = createAsyncThunk(
  `${sliceName}/getCurrentLocationAddress`,
  async ({ lat, lon }) => {
    const baseUrl = `${process.env.REACT_APP_OPEN_CAGE_API_BASE_URL}${OPEN_CAGE_API_CONTEXT}`
    const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const fullUrl = `${baseUrl}?q=${lat}+${lon}&key=${apiKey}`
    // Can create a request handler proxy to create axios instance at one place
    // and reuse it everywhere it is needed.
    try {
      const response = await axios.get(fullUrl, {
        headers: COMMON_HEADERS
      })
      return response.data
    } catch(err) {
      console.log(err, 'error in open cage api')
      return err
    }
})

export const addressSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // TODO: data massaging for address data can go in here
    // weatherDataAdded(state, action) {
    //   state.currentAddress = action.payload;
    // },
  },
  extraReducers: {
    [getCurrentLocationAddress.pending]: (state) => {
      state.status = 'loading'
    },
    [getCurrentLocationAddress.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.address = action.payload;
    },
    [getCurrentLocationAddress.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
});

// export const { weatherDataAdded } = weatherSlice.actions;

export default addressSlice.reducer;

// state getters
export const getAddressApiStatus = (state) => state.address.status
export const getCityAndState = ({
  address: {
    address: {
      results: [{
        components: {
          city = 'N/A',
          state_code = 'N/A'
        }
      } = {}] = []
    }
  }
}) => {
  return {
    city,
    state: state_code,
  }
}
export const getStreetAddress = ({
  address: {
    address: {
      results: [{
        formatted: fullStreetAddress,
      } = {}] = []
    }
  }
}) => fullStreetAddress

