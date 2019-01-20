import React from 'react'
import { Provider, } from 'react-redux'
import { Platform, StatusBar, StyleSheet, View, Text, } from 'react-native'
import { AppLoading, Asset, Font, Icon, } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import store from './store'
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
