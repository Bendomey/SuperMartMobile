import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Cart
} from 'screens'



const AppDrawer = createStackNavigator({
    Cart
}, {
    initialRouteName: 'Cart',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)