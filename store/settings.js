import { AsyncStorage, } from '../node_modules/@aws-amplify/core'

const defaultSettings = {
  tempMin: 0,
  tempMax: 50,
  weatherId: 8,
  windMax: 15,
  windMin: 0,
}

const NEW_SETTINGS = 'NEW_SETTINGS'
const GOT_SETTINGS_FROM_PHONE = 'GOT_SETTINGS_FROM_PHONE'

const gotSettingsFromPhone = settings => {
  console.log('aslgjalg')
  return {
    type: GOT_SETTINGS_FROM_PHONE,
    settings,
  }
}

const settingsSaved = (settings) => {
  return {
    type: NEW_SETTINGS,
    settings,
  }
}
export const saveSettings = settings => {
  return async dispatch => {
    saveSettingsToPhone(settings)
    dispatch(settingsSaved(settings))

  }

}

const saveSettingsToPhone = async settings => {
  try {
    if (await AsyncStorage.getItem('settings')) { await AsyncStorage.removeItem('settings') }
    await AsyncStorage.setItem('settings', JSON.stringify(settings))
  } catch (err) {
    console.log(err)
  }
}

export const getSettingsFromPhone = () => {
  return async dispatch => {
    try {
      const settingsAsync = await AsyncStorage.getItem('settings')
      const settings = JSON.parse(settingsAsync)
      dispatch(gotSettingsFromPhone(settings))
    } catch (err) {
      console.log(err)
    }

  }
}

export default function(state = defaultSettings, action) {
  switch (action.type) {
    case NEW_SETTINGS:
      return action.settings
    case GOT_SETTINGS_FROM_PHONE:
      return action.settings
    default:
      return state
  }
}
