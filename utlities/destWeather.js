const destWeather = (weatherJson) => {
  const { weather, main, wind, } = weatherJson

  const weatherToday = {
    weatherId: weather[0].id,
    weatherTitle: weather[0].main,
    detailedDesc: weather[0].description,
    icon: weather[0].icon,

    temp: main.temp, // should be in F
    humidity: main.humidity,

    wind: wind.speed, // should be mph

  }

  return weatherToday
}

export default destWeather
