import React from 'react'
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import MainTabs from './MainTab'
import { View, Text, ScrollView, Image } from 'react-native'

const HomeDrawer = createDrawerNavigator({
    Home: MainTabs,
},{
    initialRouteName: 'Home',
    contentOptions: {
        activeTintColor: 'red'
    },
    contentComponent: props => {
        <View>
            <Image source={require('../assets/menu1.jpg')} style={{height: 200, width: '100%'}}/>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </View>
    }
})

export default HomeDrawer