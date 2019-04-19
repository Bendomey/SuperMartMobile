import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainTabs from './MainTab'
import Drawer from './Drawer'
import RegisterStack from './RegisterStack'
import LoginStack from './LoginStack'
import {Loading } from 'screens'

const container = createSwitchNavigator({
	Loading,
    LoginStack,
    RegisterStack,
    MainTabs
},{
	initialRouteName: 'Loading'
})

export default createAppContainer(container)