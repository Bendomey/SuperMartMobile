import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox} from 'react-native';
import { AppContainer } from 'navigation'
import { ResetPassword } from 'screens'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-redux'
import store from './Source/store'

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Warning:','Require cycle:'])
  
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
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
