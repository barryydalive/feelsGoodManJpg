import axios from 'axios'
const { destWeather, goodDayBadDay, } = require('../utlities')

const GOT_WEATHER = 'GOT_WEATHER'

// const goodBad = true
const gotWeather = weather => {
  return {
    type: GOT_WEATHER,
    weather,
  }
}

export const getWeather = (lat, lon, settings) =>{
  return async dispatch => {
    try {
      lat = Math.round(lat)
      lon = Math.round(lon)
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?appId=a1a4d8eb15fe259cccfab6c13328be1b&lat=${lat}&lon=${lon}&units=imperial&callback
    `)
      const weather = destWeather(res.data)
      const action = gotWeather(weather)

      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

// export default checkWeather
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_WEATHER:
      return action.weather
    default:
      return state
  }
}
