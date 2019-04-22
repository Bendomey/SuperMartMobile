import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Home,
    SingleCategory
} from 'screens'



const AppDrawer = createStackNavigator({
    Home,
    SingleCategory
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)