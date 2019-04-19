import React from 'react'
import { View,Text,ScrollView,StatusBar,KeyboardAvoidingView,Image,TextInput,Platform,ActivityIndicator } from 'react-native'
import { RaisedTextButton } from 'react-native-material-buttons'
import Icon from 'react-native-vector-icons/Ionicons'
import { LoginStyle } from 'styles'
import Modal from 'react-native-modal'
import { FORGOT_PASSWORD_CODE } from 'react-native-dotenv'

export default class ForgotPassword extends React.Component{
  subscription = null
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: '',
	  	visibility:false,
	  	networkVisibility:false,
      isConnected:false,
      errorMsg:''
	  };
	}

  componentDidMount(){
    const listener = data => {
      NetInfo.isConnected.fetch().then(isConnected => {
        this.setState({isConnected})
      })
    }
        
    this.subscription = NetInfo.addEventListener('connectionChange',listener);     
  }

  componentWillUnMount(){
    this.subscription = NetInfo.removeEventListener('connectionChange')
  }

  /**
  * Check if youre connected to the internet
  * Send your email for reset code
  * Redirect them to verify code screen for verification
  */

  handleSubmit = () => {
    const { email, visibility, networkVisibility, isConnected, errorMsg } = this.state
    const listener = data => {
      NetInfo.isConnected.fetch().then(isConnected => {
        this.setState({isConnected})
      })
    }
        
    this.subscription = NetInfo.addEventListener('connectionChange',listener);
    if(isConnected){
      if(email == ''){
        this.setState({errorMsg:'Email field is empty'})
      }else{
        this.setState({visibility: true})
        fetch(FORGOT_PASSWORD_CODE,{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            email
          })
        })
        .then((data) => data.json())
        .then(data => {
          if(data){
            this.props.navigation.navigate('verifyPhone',{
              userId:data.id,
              userContact:data.contact
            })
          }else{
            this.setState({visibility:false,errorMsg:'This email does not exists in our records'})
          }
        })
      }
    }else{
      this.setState({networkVisibility:true})
    }
  }

  _closeNetworkModal = () => {
      this.setState({networkVisibility: false})
    }

	render() {
      	const { email, visibility, networkVisibility, isConnected } = this.state
		return (
		<ScrollView style={LoginStyle.container}>
          <StatusBar hidden />
          <Image source={require('../assets/loginPic.jpg')} style={LoginStyle.image} />
            <View style={LoginStyle.loginView}>
              <Text style={LoginStyle.loginText}>Forgot Password?</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', marginBottom: 10, marginHorizontal: 20}}>
              <Text style={{color: '#000'}}>Please enter your email address below; We'll send you a verification code to help verify you and then help you reset your password</Text>
            </View>
            <KeyboardAvoidingView>
              <View style={LoginStyle.textInputView}>
                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}}>
                  <Icon name={Platform.OS == 'android' ? 'md-contact' : 'ios-contact'} color={"black"} size={Platform.OS == "android" ? 20 : 1} style={{position: 'relative', left: 25}} />
                  <TextInput style={LoginStyle.textViewNode} placeholderTextColor={"black"} value={email} onChangeText={(value) => this.setState({email: value})} placeholder={"Email"} keyboardType={'email-address'} underlineColorAndroid={'#bfbfbf'} />
                </View>
             </View>
            </KeyboardAvoidingView>
            <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10,}}>
              <RaisedTextButton title={"Sign In"} onPress={this.handleSubmit} style={{width: '80%', borderRadius: 5,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
            </View>
            <Text style={{color: 'red',fontSize: 12}}>{this.state.errorMsg}</Text>

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
		);
	}
}