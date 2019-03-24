import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainTabs from './MainTab'
import {Login, Register } from 'screens'

const container = createSwitchNavigator({
    Login,
    Register,
    MainTabs
})

export default createAppContainer(container)