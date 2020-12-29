import React from 'react'
import { useSelector } from 'react-redux'
import FilterDramaSharpIcon from '@material-ui/icons/FilterDramaSharp';
import {
  getWeatherDescription,
  getWeatherApiStatus,
  getTemperatureInfo
} from '../redux/weatherSlice'

export const DailyWeather = () => {
  const weatherApiStatus = useSelector(getWeatherApiStatus)
  const weatherDescription = useSelector(getWeatherDescription)
  const {
    temp,
  } = useSelector(getTemperatureInfo)

  return (
    <section>
        {
          weatherApiStatus === 'succeeded'
          &&
          <>
            <div className="text-capitalize">
              {weatherDescription}
            </div>
            <div className="icon-temp">
              <FilterDramaSharpIcon className="cloud-icon"></FilterDramaSharpIcon>
              <p className="daily-temperature">{Math.round(temp)} °F</p>
            </div>
          </>
        }
        {
          weatherApiStatus === 'failed'
          &&
          <>
            <span>Sorry, we couldn't load your weather information</span>
          </>
        }
    </section>
  );
}
