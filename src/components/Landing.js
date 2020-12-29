import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getCurrentLocationWeather,
  getWeatherInOneCall,
  getWeatherApiStatus,
  getAllWeatherApiStatus
} from '../redux/weatherSlice'
import {
  getCurrentLocationAddress,
  getAddressApiStatus
} from '../redux/addressSlice'

import { DailyWeather } from './DailyWeather'
import { WeeklyWeather } from './WeeklyWeather'
import { Address } from './Address'

export const Landing = () => {
  // defaults for latitude and longitude are my current location details.
  const [lat, setLatitude] = useState(30.2963825)
  const [lon, setLongitude] = useState(-97.73907609999999)
  const dispatch = useDispatch()
  const weatherApiStatus = useSelector(getWeatherApiStatus)
  const addressApiStatus = useSelector(getAddressApiStatus)
  const allWeatherApiStatus = useSelector(getAllWeatherApiStatus)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          coords: {
            latitude: currentLatitude,
            longitude: currentLongitude
          }
        } = position;
        setLatitude(currentLatitude)
        setLongitude(currentLongitude)
        if (addressApiStatus === 'idle') {
          dispatch(getCurrentLocationAddress({ lat, lon }))
        }
        if (weatherApiStatus === 'idle') {
          dispatch(getCurrentLocationWeather({ lat, lon }))
        }
        if (allWeatherApiStatus === 'idle') {
          dispatch(getWeatherInOneCall({ lat, lon }))
        }
      })
    }
  }, [lat, lon, addressApiStatus, weatherApiStatus, allWeatherApiStatus, dispatch])

  return (
    <div className="row landing-wrapper">
      <div className="col-md-2"></div>
      <Box className="col-md-8 landing">
        <Box>
          {
              // You can handle the loader in the parent component as well
              // and display only the success/error when the api returns info
              // advantage of this is child component only spits out success/error html
              // or handle all those scenarios inside the child component,
              // advantage of this approach is all conditional logic for that sub-context
              // is inside the child component, although make sure the
              // component doesn't try to access state before the api has
              // returned the information
              (addressApiStatus === 'idle' || addressApiStatus === 'loading')
              ?
              <div className="circular-progress">
                <CircularProgress/>
              </div>
              :
              <Address></Address>
            }
        </Box>
        <Box className="daily-weather-wrapper">
          {
            (weatherApiStatus === 'idle' || weatherApiStatus === 'loading')
            ?
            <div className="circular-progress">
                <CircularProgress/>
            </div>
            :
            <DailyWeather></DailyWeather>
          }
        </Box>
        <Box className="daily-weather-wrapper">
          {
            (allWeatherApiStatus === 'idle' || allWeatherApiStatus === 'loading')
            ?
            <div className="circular-progress">
                <CircularProgress/>
            </div>
            :
            <WeeklyWeather></WeeklyWeather>
          }
        </Box>
      </Box>
    </div>
  );
}
