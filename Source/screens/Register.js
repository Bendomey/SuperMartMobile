import React from 'react'
import { TouchableOpacity, View, Text, Button, ScrollView, Image, KeyboardAvoidingView, TextInput, Platform, StatusBar, ActivityIndicator } from 'react-native'
import { RegisterStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { RaisedTextButton } from 'react-native-material-buttons'
import Modal from 'react-native-modal'
import NetInfo from "@react-native-community/netinfo"
import { emailChecker } from 'constants'
import { SIGNUP_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'



class Register extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         fullName: '',
         contact: '',
         email: '',
         password: '',
         confirmPassword: '',
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

     handleSignUp = () => {
        const { fullName, contact, email, password, confirmPassword, isConnected } = this.state
        //check the network
        const listener = data => {
          NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({isConnected})
          })
        }
        const subscription = NetInfo.addEventListener('connectionChange',listener);     
        if(isConnected == false){
          this.setState({networkVisibility: true});
        }else{
          if(fullName == ''){
            this.setState({errorMsg: 'Name field is empty'});
          }else if(contact == ''){
            this.setState({errorMsg: 'Contact field is empty'});
          }else if(email == ''){
            this.setState({errorMsg: 'Email field is empty'});
          }else if(password == ''){
            this.setState({errorMsg: 'Password field is empty'});
          }else if(confirmPassword == ''){
            this.setState({errorMsg: 'Confirm password field is empty'});
          }else if(password != confirmPassword){
            this.setState({errorMsg:'Your password fields are not equal'});
          }else if(password.lenght < 6){
            this.setState({errorMsg:'Password cannot be less than 6'});
          }else{
            this.setState({errorMsg:'', visibility: true});
            fetch(SIGNUP_URL,{
              method: 'POST',
              headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                name:fullName,
                contact,
                email,
                password
              })
            })
            .then(data => data.json())
            .then(data => {
              if(data == 'success'){
                this.props.navigation.navigate('Login')
              }
            }).catch((e) => {
              this.setState({visibility: false, networkVisibility: true})
            })

          }
        }
       // this.props.navigation.navigate("MainTabs")
     }

    _closeNetworkModal = () => {
      this.setState({networkVisibility: false})
    }


     handleSignInButton = () => {
       this.props.navigation.navigate("Login")
     }

    render() {
      const { fullName, contact, email, password, confirmPassword, networkVisibility, visibility } = this.state
      return (
        <ScrollView style={RegisterStyle.container}>
          <StatusBar hidden />
          <Image source={require('../assets/loginPic.jpg')} style={RegisterStyle.image} />
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
              <View style={{flexDirection: 'row', marginBottom: 8, justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == "android" ? 'md-key' : 'ios-key'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={password} onChangeText={(value) => {this.setState({password:value})}} placeholder={"Password"} secureTextEntry={true} underlineColorAndroid={'#bfbfbf'} />
              </View>
              <View style={{flexDirection: 'row', marginBottom: 8, justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Platform.OS == "android" ? 'md-key' : 'ios-key'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                <TextInput style={RegisterStyle.textViewNode} placeholderTextColor={"black"} value={confirmPassword} onChangeText={(value) => {this.setState({confirmPassword:value})}} placeholder={"Confirm Password"} secureTextEntry={true} underlineColorAndroid={'#bfbfbf'} />
              </View>
            </View>
          </KeyboardAvoidingView>
           <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10,marginTop: 0}}>
              <Text style={{color: 'red',fontSize: 12}}>{this.state.errorMsg}</Text>
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
                <Icon name={Platform.OS == "android" ? 'logo-facebook' : 'logo-facebook'} color={'#e2c012'} size={20}/>
              </View>
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
    };
}

export default Register