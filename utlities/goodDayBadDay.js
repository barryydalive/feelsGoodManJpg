const preferences = {
  tempMin: 0,
  tempMax: 50,
  weather: 8,
  windMax: 15,
  windMin: 0,
}

// weatherCodes see here https://openweathermap.org/weather-conditions
// divide by 100 to find general condition (804 overcast anomoly)
const goodDayBadDay = (weather, settings = preferences) => {
  let bad = 0
  let good = 0

  weather.temp <= settings.tempMax && weather.temp >= settings.tempMin ? good++ : bad++
  console.log('good:', good)
  console.log('bad:', bad)
  weather.wind < settings.windMax && weather.wind > settings.windMin ? good++ : bad ++
  console.log('good:', good)
  console.log('bad:', bad)
  weather.weatherId === settings.weather || weather.weatherId / 100 === settings.weather ? good++ : bad++
  console.log('weather.weatherId:', weather.weatherId)
  console.log('good:', good)
  console.log('bad:', bad)

  if (good >= bad) { return true }

  return false

}

export default goodDayBadDay
