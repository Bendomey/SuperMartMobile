import React from 'react'
import { Platform, Image } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack'
import CartStack from './CartStack'


export default createMaterialBottomTabNavigator({
    Home:{
        screen: HomeStack,
        navigationOptions: {
            header: null,
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, tintColor}) => < Icon focused = {focused} color = {tintColor} size = {Platform.OS == "android" ? 28 : 1 } name = {Platform.OS == "android" ? 'md-home' : 'ios-home'}/>
        }
    },
    Profile:{
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused, tintColor}) => < Icon focused = {focused} color = {tintColor} size = {Platform.OS == "android" ? 28 : 1 } name = {Platform.OS == "android" ? 'md-contact' : 'ios-contact'}/>
        }
    },
    Settings:{
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({focused, tintColor}) => < Icon focused = {focused} color = {tintColor} size = {Platform.OS == "android" ? 28 : 1 } name = {Platform.OS == "android" ? 'md-settings' : 'ios-settings'}/>
        }
    },
    Cart:{
        screen: CartStack,
        navigationOptions: {
            tabBarLabel: 'Cart',
            tabBarIcon: ({focused, tintColor}) => < Icon focused = {focused} color = {tintColor} size = {Platform.OS == "android" ? 28 : 1 } name = {Platform.OS == "android" ? 'md-cart' : 'ios-cart'}/>
        }
    }
},{
    shifting: true,
    initialRouteName: 'Settings',
    activeColor: 'red',
    barStyle:{
        backgroundColor: '#fff',
    },
    // labeled: false
})