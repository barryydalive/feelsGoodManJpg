import React from 'react'
import { Platform, View, Text, } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import Preferences from '../screens/PreferencesScreen'
import TabBarIcon from '../components/TabBarIcon'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused, }) =>
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ,
}

const SettingsStack = createStackNavigator({
  Settings: Preferences,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  headerStyle: {
    backgroundColor: '#212121',
  },
  tabBarIcon: ({ focused, }) =>
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ,
}

const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
})

export default MainTabNavigator
