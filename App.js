import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { AppContainer } from 'navigation'
import { VerifyNewAccount } from 'screens'
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
