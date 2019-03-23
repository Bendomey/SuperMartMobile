import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Settings
} from 'screens'



const AppDrawer = createStackNavigator({
    Settings
}, {
    initialRouteName: 'Settings',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)