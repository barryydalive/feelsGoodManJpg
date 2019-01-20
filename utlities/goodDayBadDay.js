const preferences = {
  tempMin: 0,
  tempMax: 50,
  weather: 8,
  windMax: 15,
}

// weatherCodes see here https://openweathermap.org/weather-conditions
// divide by 100 to find general condition (804 overcast anomoly)
const goodDayBadDay = (weather) => {
  let bad = 0
  let good = 0

  weather.temp <= preferences.tempMax && weather.temp >= preferences.tempMin ? good++ : bad++
  console.log('good:', good)
  console.log('bad:', bad)
  weather.wind < preferences.windMax ? good++ : bad ++
  console.log('good:', good)
  console.log('bad:', bad)
  weather.weatherId / 100 === preferences.weather ? good++ : bad++
  console.log('good:', good)
  console.log('bad:', bad)

  if (good >= bad) { return true }

  return false

}

export default goodDayBadDay
