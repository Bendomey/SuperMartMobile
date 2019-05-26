import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Home,
    SingleCategory,
    SingleProduct
} from 'screens'



const AppDrawer = createStackNavigator({
    Home,
    SingleCategory,
    SingleProduct
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})


export default createAppContainer(AppDrawer)