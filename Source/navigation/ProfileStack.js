import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Profile
} from 'screens'



const AppDrawer = createStackNavigator({
    Profile
},{
    initialRouteName: 'Profile',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)