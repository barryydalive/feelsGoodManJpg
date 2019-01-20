import React from 'react'
import { Platform, View, Text, } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'

const MainTabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen, },
  Settings: { screen: HomeScreen, },
})

export default MainTabNavigator
