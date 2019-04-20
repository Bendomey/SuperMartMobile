import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Profile,
    EditProfile
} from 'screens'



const AppDrawer = createStackNavigator({
    Profile,
    EditProfile
},{
    initialRouteName: 'Profile',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)