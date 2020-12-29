import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCurrentLocationWeather,
  getWeatherApiStatus,
  selectAllInfo
} from '../redux/weatherSlice'
import {
  getCurrentLocationAddress,
  getAddressApiStatus,
  getStreetAddress
} from '../redux/addressSlice'

export const Landing = () => {
  // defaults for latitude and longitude are my current location details.
  const [lat, setLatitude] = useState(30.2963825);
  const [lon, setLongitude] = useState(-97.73907609999999);
  const dispatch = useDispatch()
  const allInfo = useSelector(selectAllInfo)
  const weatherApiStatus = useSelector(getWeatherApiStatus)
  const addressApiStatus = useSelector(getAddressApiStatus);
  const fullStreetAddress = useSelector(getStreetAddress);

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
        dispatch(getCurrentLocationAddress({ lat, lon }))
        dispatch(getCurrentLocationWeather({ lat, lon }))
      })
    }
  }, [lat, lon, dispatch])

  return (
    <div>
      {/* TODO: Need to build the UI with API info */}
      <>
        {
          (weatherApiStatus === 'idle' || weatherApiStatus === 'loading')
          ?
          <p>The weather is loading</p>
          :
          <div>
            <span>City i am calling api from</span>
            <p>{allInfo.name}</p>
          </div>
        }
      </>
      <>
        {
          (addressApiStatus === 'idle' || addressApiStatus === 'loading')
          ?
          <p>The address is loading</p>
          :
          <div>
            <span>Full street address is:</span><span>{fullStreetAddress}</span>
          </div>
        }
      </>
    </div>
  );
}
