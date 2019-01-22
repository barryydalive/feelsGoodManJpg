import React from 'react'
import { Provider, } from 'react-redux'
import { Platform, StatusBar, StyleSheet, View, Text, SafeAreaView, } from 'react-native'
import { AppLoading, Asset, Font, Icon, } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import store from './store'
import Amplify from 'aws-amplify'
import awsConfig from './src/aws-exports'

import { withAuthenticator, } from 'aws-amplify-react-native'

Amplify.configure(awsConfig)
class App extends React.Component {
  state={
    isReady: false,
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true, })}
          onError={console.warn}
        />
      )
    }
    return (
      <Provider store={store}>
        <View style={{ flex: 1, }}>
          <AppNavigator/>
        </View>
      </Provider>
    )
  }
  async _cacheResourcesAsync() {
    const images = [ require('./assets/feelsGood.png'), require('./assets/feelsBad.png'), ]

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }
}
export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
})

