import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Home
} from 'screens'



const AppDrawer = createStackNavigator({
    Home
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)