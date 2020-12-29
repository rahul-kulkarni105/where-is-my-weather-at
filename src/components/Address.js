import React from 'react'
import { useSelector } from 'react-redux'
import {
  getAddressApiStatus,
  getCityAndState
} from '../redux/addressSlice'

export const Address = () => {
  const addressApiStatus = useSelector(getAddressApiStatus);
  const { city, state } = useSelector(getCityAndState);
  const dateObj = new Date()
  const weekday = dateObj.toLocaleString("default", { weekday: "long" })
  const time = dateObj.toLocaleTimeString([], {timeStyle: 'short'});

  return (
    <section className="address">
      {
        addressApiStatus === 'succeeded'
        &&
        <>
          <div className="city-state">
            <h1 className="address-headers">{city},</h1>
            <h1 className="address-headers">{state.toUpperCase()}</h1>
          </div>
          <div className="day-time">{weekday} {time}</div>
        </>
      }
      {
        addressApiStatus === 'failed'
        &&
        <>
          <span>Sorry, we couldn't load your location information</span>
        </>
      }
    </section>
  );
}
