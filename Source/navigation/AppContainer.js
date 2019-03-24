import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainTabs from './MainTab'
import Drawer from './Drawer'
import {Login, Register } from 'screens'

const container = createSwitchNavigator({
    Login,
    Register,
    MainTabs
    // Drawer
})

export default createAppContainer(container)