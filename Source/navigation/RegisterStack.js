import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Register,
    VerifyNewAccount
} from 'screens'



const RegisterStack = createStackNavigator({
    Register,
    VerifyNewAccount
},{
    initialRouteName: 'Register',
    headerMode: 'none'
})


export default createAppContainer(RegisterStack)