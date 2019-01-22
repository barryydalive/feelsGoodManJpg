import React from 'react'
import {
  Image,
  View,
  Text,
} from 'react-native'
import { WebBrowser, } from 'expo/build/Expo'

// import { MonoText, } from '../components/StyledText'
import { connect, } from 'react-redux'
import { getWeather, } from '../store/weather'
import { Permissions, Location, } from 'expo/build/Expo'
import goodDayBadDay from '../utlities/goodDayBadDay'
import { getSettingsFromPhone, } from '../store/settings'
// import { evaluateGoodBad, } from '../store/evaluation'
class HomeScreen extends React.Component {
  state = {
    gotLocation: false,
    lat: 0.0,
    long: 0.0,
  }
  componentWillMount() {
    if (!this.state.gotLocation) {
      this._getLocation()
    }
    this.props.getSettingsFromPhone()

  }
  static navigationOptions = {
    header: null,
  }

  _getLocation = async () => {
    const { status, } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      try {
        const location = await Location.getCurrentPositionAsync()

        this.setState({
          gotLocation: true,
          lat: location.coords.latitude,
          long: location.coords.longitude,
        }, () => this.props.getWeather(this.state.lat, this.state.long, this.props.settings))
        console.log('this.state.gotLocation:', this.state.gotLocation)
      } catch (err) {
        throw new Error('Location permission not granted')
      }
    }

  }

  render() {
    const { weather, settings, } = this.props
    const good = goodDayBadDay(weather, settings)
    console.log(good)

    if (this.state.gotLocation) {
      return (

        <View style={{ display: 'flex', justifyContent: 'center', height: '100%', }}>
          <Image style={{ resizeMode: 'contain', height: '100%', width: '100%', }}
            source={good ? require('../assets/feelsGood.png') : require('../assets/feelsBad.png')
            }
          />
          <View style={{ position: 'absolute', top: -500, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 50, }}> THE WEATHER </Text>
          </View>
          <View style={{ position: 'absolute', top: 500, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 40, }}> {good ? 'Feels Good Man' : 'Feels Bad Man'} </Text>
          </View>

        </View>
      )
    }
    return (
      <View style={{ position: 'absolute', top: 500, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 40, }}> Please enable location! </Text>
      </View>
    )

  }

}

const mapStateToProps = state => {
  return {
    weather: state.weather,
    settings: state.settings,
    // evaluation: state.evaluation,
  }
}

const mapDispatchToProps = dispatch => {
  return { getWeather: (lat, long, settings) => dispatch(getWeather(lat, long, settings)),
    getSettingsFromPhone: () => dispatch(getSettingsFromPhone()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
