import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation'
import {
    Login,
    ForgotPassword,
    VerifyPhone,
    ResetPassword
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
    },
    VerifyPhone:{
        screen:VerifyPhone,
        navigationOptions:{
            header:null
        }
    },
    ResetPassword:{
        screen:ResetPassword,
        navigationOptions:{
            header:null
        }
    }
},{
    initialRouteName: 'Login',
})


export default createAppContainer(LoginStack)