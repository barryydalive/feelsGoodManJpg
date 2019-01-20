import axios from 'axios'

const GOT_WEATHER = 'GOT_WEATHER'

// const goodBad = true
const gotWeather = good => {
  return {
    type: GOT_WEATHER,
    good,
  }
}

export const getWeather = (lat, lon) =>{
  return async dispatch => {
    try {
      lat = Math.round(lat)
      lon = Math.round(lon)
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?appId=a1a4d8eb15fe259cccfab6c13328be1b&lat=${lat}&lon=${lon}&callback
    `)
      const weather = res.data
      const weatherCode = weather.weather[0].id
      const good = [ weatherCode !== 804 && weatherCode / 100 === 8 ? true : false, weatherCode, ]
      const action = gotWeather(good)
      console.log('LOOK AT ME --------> ' + weatherCode)
      console.log('lat:', lat)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

// export default checkWeather
export default function(state = [ true, '', ], action) {
  switch (action.type) {
    case GOT_WEATHER:
      return action.good
    default:
      return state
  }
}
