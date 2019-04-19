import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Login,
    ForgotPassword
} from 'screens'



const LoginStack = createStackNavigator({
    Login:{
    	screen:Login,
    	navigationOptions:{
	    	header:null
    	}
    },
    ForgotPassword:{
    	screen:ForgotPassword,
    	navigationOptions:{
    		headerTransparent:true,
    	}
    }
},{
    initialRouteName: 'Login',
})


export default createAppContainer(LoginStack)