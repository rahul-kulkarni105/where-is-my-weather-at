import React from 'react'
import { useSelector } from 'react-redux'
import {
  getAllWeatherApiStatus,
  selectAllWeatherInfo,
  weeklyWeatherInfo
} from '../redux/weatherSlice'

export const WeeklyWeather = () => {
  const allWeatherApiStatus = useSelector(getAllWeatherApiStatus)
  const allWeatherDescription = useSelector(selectAllWeatherInfo)
  const weeklyWeather = useSelector(weeklyWeatherInfo)

  return (
    <section>
        {
          allWeatherApiStatus === 'succeeded'
          &&
          <>
            <div className="text-capitalize">
              <span>Timezone: </span>{allWeatherDescription.timezone}
            </div>
            <div className="week">
              {
                weeklyWeather.map(({
                  dayOfTheWeek,
                  maxTemp,
                  minTemp
                }, index) => {
                  return (
                    <div className="weekday" key={`week-day-key${index}`}>
                      <p className="weekday-value">{dayOfTheWeek}</p>
                      <p className="weekday-value">{maxTemp}</p>
                      <p className="weekday-value">{minTemp}</p>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
        {
          allWeatherApiStatus === 'failed'
          &&
          <>
            <span>Sorry, we couldn't load your weather information</span>
          </>
        }
    </section>
  );
}
