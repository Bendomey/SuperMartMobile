import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import MainTabs from './MainTab'

const container = createSwitchNavigator({
    MainTabs
})

export default createAppContainer(container)