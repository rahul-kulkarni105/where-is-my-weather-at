import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCurrentLocationWeather,
  getApiStatus,
  selectAllInfo
} from '../redux/openWeather'

export const Landing = () => {
  const dispatch = useDispatch()
  const allInfo = useSelector(selectAllInfo)
  const weatherApiStatus = useSelector(getApiStatus)

  useEffect(() => {
    if (weatherApiStatus === 'idle') {
      dispatch(getCurrentLocationWeather())
    }
  }, [weatherApiStatus, dispatch])

  return (
    <div>
      {/* TODO: Need to build the UI with API info */}
      <p>City i am calling api from</p>
      {allInfo.name}
    </div>
  );
}
