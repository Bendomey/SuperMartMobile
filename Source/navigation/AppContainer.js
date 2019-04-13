import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainTabs from './MainTab'
import Drawer from './Drawer'
import {Login, Register, Loading } from 'screens'

const container = createSwitchNavigator({
	Loading,
    Login,
    Register,
    MainTabs
},{
	initialRouteName: 'Loading'
})

export default createAppContainer(container)