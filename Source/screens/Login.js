import React from 'react'
import { TouchableOpacity, View, Text, Button, ScrollView, Image, KeyboardAvoidingView, TextInput, Platform, StatusBar, ActivityIndicator } from 'react-native'
import { LoginStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { RaisedTextButton } from 'react-native-material-buttons'
import Modal from 'react-native-modal'
import NetInfo from "@react-native-community/netinfo"
import { LOGIN_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'
// import { storeData } from 'Library'

class Login extends React.Component {
    _isMounted = false;
    _modalIsMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          visibility: false,
          networkVisibility: false,
          isConnected: false,
          errorMsg: ''
        }
    }

    componentDidMount(){
      this._isMounted = true;
      const listener = data => {
        NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected})
        })
      }
      if(this._isMounted){
        const subscription = NetInfo.addEventListener('connectionChange',listener);     
      }
    }

    componentWillUnmount(){
      this._isMounted = false;
      this._modalIsMounted =false;
    } 

    storeData = (key, value) => {
      AsyncStorage.setItem(key,value)
    }

    handleLogin = () => {
      const {email,password} = this.state
      //check the network
      const listener = data => {
        NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected})
        })
      }
      const subscription = NetInfo.addEventListener('connectionChange',listener);     
      if(this.state.isConnected == false){
        this.setState({networkVisibility: true});
      }else
      if(email == ''){
        this.setState({errorMsg: 'Email field is empty'})
      }else if(this.state.password == ''){
        this.setState({errorMsg: 'Password field is empty'})
      }else{
        this.setState({errorMsg:'',visibility: true})   
        this._modalIsMounted = true;
        //checking credentials from server

        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        })
        .then(data => data.json())
        .then((data) => {
            if(data.id == null){
              this.setState({visibility: false, errorMsg:'Your credentials are incorrect'})              
            }else{
              this.storeData('user',JSON.stringify(data))
              this.props.navigation.navigate("MainTabs")
            }
        })
        .catch(function (error) {
          this.setState({visibility: false, errorMsg: 'Something went wrong, try again'})
        });

      }
    }

     _closeNetworkModal = () => {
      this.setState({networkVisibility: false})
    }

    handleSignUpButton = () => {
      this.props.navigation.navigate("RegisterStack")
    }

    handleForgotPassword = () => {
      this.props.navigation.navigate("ForgotPassword")
    }

    _skipNow = () => {
      this.props.navigation.navigate("MainTabs")
    }

    render() {
      const { email, password, visibility, networkVisibility } = this.state
      return (
        <ScrollView style={LoginStyle.container}>
          <StatusBar hidden />
          <Image source={require('../assets/loginPic.jpg')} style={LoginStyle.image} />
            <View style={LoginStyle.loginView}>
              <Text style={LoginStyle.loginText}>Login to your account</Text>
            </View>
            <KeyboardAvoidingView>
              <View style={LoginStyle.textInputView}>
                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}}>
                  <Icon name={Platform.OS == 'android' ? 'md-contact' : 'ios-contact'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                  <TextInput style={LoginStyle.textViewNode} placeholderTextColor={"black"} value={email} onChangeText={(value) => this.setState({email: value})} placeholder={"Email"} keyboardType={'email-address'} underlineColorAndroid={'#bfbfbf'} />
                </View>
                <Text style={{color: 'red',fontSize: 12}}>{this.state.errorMsg}</Text>
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
              <TouchableOpacity onPress={this.handleForgotPassword}><Text style={{color: 'red'}}>Forgot your password?</Text></TouchableOpacity>
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
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginVertical: 10,}}>
              <Text>Not a member? </Text>
              <TouchableOpacity onPress={this.handleSignUpButton}><Text style={{color: 'red'}}>Sign Up</Text></TouchableOpacity>
            </View>
            

          {/*For network connection*/}
            <Modal isVisible={networkVisibility} animationIn="slideInUp" animationInTiming={700} animationOut="bounceOutDown" animationOutTiming={1000} onBackButtonPress={()=>this.setState({networkVisibility:!networkVisibility})}>
              <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name={Platform.OS == 'android' ? 'md-bug' : 'ios-bug'} size={30} color={"orange"} />
                </View>
                <View style={{height: 160, width: '100%',flexDirection: 'column', justifyContent: 'space-between',alignItems: 'center', marginVertical: 10}}>
                  <Text style={{fontSize: 25}}>Ooops!!</Text>
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={{textAlign: 'center'}}>Sorry, this device is not connected to the internet.Please connect and try again</Text>
                  </View>
                  <RaisedTextButton title={"OK"} onPress={this._closeNetworkModal} style={{width: '90%', borderRadius: 10,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
                </View>
              </View>
            </Modal>

          {/*For authentication*/}
            <Modal isVisible={visibility} animationIn="slideInLeft" animationInTiming={1000} animationOut="bounceOutUp" animationOutTiming={1000}>
              <View style={{ height: 150, width: '100%', backgroundColor: '#fff', borderRadius: 15, }}>
                <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size={50} color='red' />
                </View>
              </View>
            </Modal>
        </ScrollView>
      )
    }

}

export default Login