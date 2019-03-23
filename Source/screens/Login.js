import React from 'react'
import { View, Text, Button } from 'react-native'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <View>
            <Text>Login</Text>
            <Button onPress={() => this.props.navigation.navigate('MainTabs')} title={"Login"} />
        </View>  
        
      )
    }

}

export default Login