import React from 'react'
import { TouchableOpacity, View, Text, Button, ScrollView, Image, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import { LoginStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { RaisedTextButton } from 'react-native-material-buttons'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        }
    }

    handleLogin = () => {
      this.props.navigation.navigate("MainTabs")
    }

    handleSignUpButton = () => {
      this.props.navigation.navigate("Register")
    }

    render() {
      const { email, password } = this.state
      return (
        <ScrollView style={LoginStyle.container}>
          <Image source={require('../assets/menu1.jpg')} style={LoginStyle.image} />
            <View style={LoginStyle.loginView}>
              <Text style={LoginStyle.loginText}>Login to your account</Text>
            </View>
            <KeyboardAvoidingView>
              <View style={LoginStyle.textInputView}>
                <View style={{flexDirection: 'row', marginBottom: 8,justifyContent: 'center', alignItems: 'center',}}>
                  <Icon name={Platform.OS == 'android' ? 'md-contact' : 'ios-contact'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                  <TextInput style={LoginStyle.textViewNode} placeholderTextColor={"black"} value={email} onChangeText={(value) => this.setState({email: value})} placeholder={"Email"} keyboardType={'email-address'} underlineColorAndroid={'#bfbfbf'} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <Icon name={Platform.OS == "android" ? 'md-key' : 'ios-key'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                  <TextInput style={LoginStyle.textViewNode} placeholderTextColor={"black"} value={password} onChangeText={(value) => {this.setState({password:value})}} placeholder={"Password"} secureTextEntry={true} underlineColorAndroid={'#bfbfbf'} />
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10,}}>
              <RaisedTextButton title={"Sign In"} onPress={this.handleLogin} style={{width: '50%', borderRadius: 20,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginVertical: 10,}}>
              <Text>Not a member? </Text>
              <TouchableOpacity onPress={this.handleSignUpButton}><Text style={{color: 'red'}}>Sign Up</Text></TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center', flexDirection: 'row',marginVertical: 10,}}>
              <View style={{backgroundColor: '#fff',marginRight:8, borderColor: '#e2c012', borderRadius: 20, borderWidth: 1, padding: 7}}>
                <Icon name={Platform.OS == "android" ? 'logo-twitter' : 'logo-twitter'} color={'#e2c012'} size={20}/>
              </View>
              <View style={{backgroundColor: '#fff', borderColor: '#e2c012', borderRadius: 20, borderWidth: 1, padding: 7}}>
                <Icon name={Platform.OS == "android" ? 'logo-googleplus' : 'logo-googleplus'} color={'#e2c012'} size={20}/>
              </View>
              <View style={{backgroundColor: '#fff',marginLeft:8, borderColor: '#e2c012', borderRadius: 20, borderWidth: 1, padding: 9}}>
                {/* <Text style={{color: '#e2c012',}}>f</Text> */}
                <Icon name={Platform.OS == "android" ? 'logo-facebook' : 'logo-facebook'} color={'#e2c012'} size={20}/>

              </View>
            </View>
        </ScrollView>
      )
    }

}

export default Login