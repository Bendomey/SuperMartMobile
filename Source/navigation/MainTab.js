import React from 'react'
import { Platform, Image } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'


const HomeStack = createStackNavigator({
    Home
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})

HomeStack.navigationOptions = {
    tabBarLabel: Home,
    tabBarIcon: ({focused,tintcolor}) => <Icon size={Platform.OS == "android" ? 30 : 1} focused={focused} color={tintcolor} name={Platform.OS == "android" ? 'md-home' : 'ios-home'} />
}

const ProfileStack = createStackNavigator({
    Profile
},{
    initialRouteName: 'Profile',
    headerMode: 'none'
})

ProfileStack.navigationOptions = {
    tabBarLabel: Profile,
    tabBarIcon: ({focused,tintcolor}) => < Icon size = {Platform.OS == "android" ? 30 : 1} focused = {focused} color = {tintcolor} name = {Platform.OS == "android" ? 'md-contact' : 'ios-contact'} />
}

const SettingsStack = createStackNavigator({
    Settings
},{
    initialRouteName: 'Settings',
    headerMode: 'none',
})

SettingsStack.navigationOptions = {
    tabBarLabel: Settings,
    tabBarIcon: ({focused,tintColor}) => <Icon size={Platform.OS == "android" ? 30 : 1} focused={focused} color={tintColor} name={Platform.OS == "android" ? 'md-settings' : 'ios-settings'} />
}

const Cart = createStackNavigator({
    Cart
},{
    initialRouteName: 'Cart',
    headerMode: 'none'
})

cart.navigationOptions = {
    tabBarLabel: Cart,
    tabBarIcon: ({focused,tintColor}) => <Image source={require('../assets/shopping-bag.png')} style={{color: tintColor, height: 30, width: 30}} />
}

export default createMaterialBottomTabNavigator({
    HomeStack,
    AccountStack,
    SettingsStack,
    Cart
},{
    shifting: true,
    initialRouteName: 'HomeStack',
    activeColor: 'red',
    barStyle:{
        background: '#fff',
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5
    }
})