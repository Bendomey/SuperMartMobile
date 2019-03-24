import React from 'react'
import { TouchableOpacity, View, Text, Button, ScrollView, Image, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import { RegisterStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { RaisedTextButton } from 'react-native-material-buttons'
import registerStyle from '../styles/registerStyle';

class Register extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         fullName: '',
         contact: '',
         email: '',
         password: '',
         confirmPassword: ''
       }
     }

     handleSignInButton = () => {
       this.props.navigation.navigate("Login")
     }

     handleSignUp = () => {
       this.props.navigation.navigate("MainTabs")
     }

    render() {
      const { fullName, contact, email, password, confirmPassword } = this.state
      return (
        <ScrollView style={RegisterStyle.container}>
          <Image source={require('../assets/menu1.jpg')} style={RegisterStyle.image} />
          <View style={RegisterStyle.loginView}>
            <Text style={RegisterStyle.loginText}>Sign Up</Text>
          </View>
          <KeyboardAvoidingView>
            <View style={RegisterStyle.textInputView}>
              <View style={{flexDirection: 'row', marginBottom: 8,justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == 'android' ? 'md-contact' : 'ios-contact'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={fullName} onChangeText={(value) => this.setState({fullName: value})} placeholder={"Full Name"} underlineColorAndroid={'#bfbfbf'} />
              </View>
              <View style={{flexDirection: 'row', marginBottom: 8,justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == 'android' ? 'md-call' : 'ios-call'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={contact} onChangeText={(value) => this.setState({contact: value})} placeholder={"Contact"} keyboardType={"number-pad"} underlineColorAndroid={'#bfbfbf'} />
              </View>
              <View style={{flexDirection: 'row', marginBottom: 8,justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == 'android' ? 'md-mail' : 'ios-mail'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={email} onChangeText={(value) => this.setState({email: value})} placeholder={"Email"} keyboardType={'email-address'} underlineColorAndroid={'#bfbfbf'} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == "android" ? 'md-key' : 'ios-key'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={password} onChangeText={(value) => {this.setState({password:value})}} placeholder={"Password"} secureTextEntry={true} underlineColorAndroid={'#bfbfbf'} />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == "android" ? 'md-key' : 'ios-key'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={confirmPassword} onChangeText={(value) => {this.setState({confirmPassword:value})}} placeholder={"Confirm Password"} secureTextEntry={true} underlineColorAndroid={'#bfbfbf'} />
              </View>
            </View>
          </KeyboardAvoidingView>
           <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10,}}>
              <RaisedTextButton title={"Sign Up"} onPress={this.handleSignUp} style={{width: '50%', borderRadius: 20,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginVertical: 10,}}>
              <Text>Already a member? </Text>
              <TouchableOpacity onPress={this.handleSignInButton}><Text style={{color: 'red'}}>Sign In</Text></TouchableOpacity>
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
    };
}

export default Register