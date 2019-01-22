import React, { Component, } from 'react'
import { View, Text, TextInput, Button, ScrollView, } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, } from 'react-native-simple-radio-button'
import { Picker, Icon, Grid, Row, Container, Header, Title, Body, Left, Right, } from 'native-base'
import { saveSettings, } from '../store/settings'
import { connect, } from 'react-redux'
import { getSettingsFromPhone, } from '../store/settings'

const radio_props = [ { label: 'calm almost none at all', value: 5, }, { label: 'a light breeeze', value: 10, }, { label: 'gentle breeze', value: 15, }, { label: 'windy', value: 25, }, { label: 'tornado levels!', value: 100, }, ]
const test_options = [ { label: 'no clouds ', value: 800, }, { label: 'some clouds ', value: 8, }, { label: 'MEGA CLOUDS ', value: 804, }, { label: 'Thunderstorms ', value: 2, }, { label: 'Drizzle ', value: 3, }, { label: 'Rain ', value: 5, }, { label: 'Snow ', value: 6, }, ]

class RadioButtonProject extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.props.getSettingsFromPhone()
    console.log('this.props:', this.props)
    this.setState(this.props.settings)
  }

  render() {

    return (
      <Container>

        <Header><Title>What Feels Good Man? </Title></Header>

        <ScrollView style={{ alignContent: 'center', }}>
          <View style={styles.setting}>
            <Title> How much wind do you like? </Title>

            <Picker
              style={{ alignSelf: 'center', }}
              mode='dropdown'
              iosIcon={<Icon name='arrow-down' />}
              selectedValue={this.state.windMax}
              //  style={{ height: 50, width: 100, }}
              onValueChange={(itemValue, itemIndex) => this.setState({ windMax: itemValue, })}>
              {radio_props.map(option => {
                return <Picker.Item key={option.value}label={option.label} value={option.value}/>
              })}
            </Picker>
          </View>

          <View style={styles.setting}>
            <Title> How Do You Like The Sky? </Title>
            <RadioForm
              labelHorizontal={true}
              style={{ flexWrap: 'wrap', alignContent: 'space-between', }}
              formHorizontal={true}
              animation={true}
              radio_props={test_options}
              initial={0}
              onPress={(value) => { this.setState({ weather: value, }) }}
            />
          </View>

          <View style={styles.setting}>
            <Title> Max Temperature in Farenheit </Title>
            <TextInput
              textAlign={'center'}
              style={{ borderWidth: 1, }}
              returnKeyType='done'
              keyboardType='number-pad'
              onChangeText={(text)=> this.MaxOnChanged(text)}
              value={this.state.tempMax.toString()}
              maxLength={3} // setting limit of input
            />
          </View>

          <View style={styles.setting}>
            <Title> Min Temperature in Farenheit </Title>
            <TextInput
              textAlign={'center'}
              style={{ borderWidth: 1, }}
              returnKeyType='done'
              keyboardType='number-pad'
              onChangeText={(text)=> this.MinOnChanged(text)}
              value={this.state.tempMin.toString()}
              maxLength={3} // setting limit of input
            />
          </View>

          <Button style={styles.button}onPress={this.savePreferences.bind(this)} title='Save Preferences' color='#841584'/>
        </ScrollView>
      </Container>
    )
  }

  MaxOnChanged(text, type) {
    let newText = ''
    const numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i]
      } else {
        // your call back function
        alert('please enter numbers only')
      }
    }
    this.setState({ tempMax: newText, })
  }

  MinOnChanged(text, type) {
    let newText = ''
    const numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1 ) {
        newText = newText + text[i]
      } else {
        // your call back function
        alert('please enter numbers only')
      }
    }
    this.setState({ tempMin: newText, })
  }

  savePreferences() {
    this.props.saveSettings(this.state)
  }
}
const mapStateToProps = (state = { settings: {}, }) => {
  return {
    settings: state.settings,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    saveSettings: settings => dispatch(saveSettings(settings)),
    getSettingsFromPhone: () => dispatch(getSettingsFromPhone()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonProject)

const styles = {
  setting: {
    padding: 30,
    alignContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
  },
}
