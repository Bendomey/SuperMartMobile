import React from 'react'
import { View,Text,ScrollView,StatusBar,KeyboardAvoidingView,Image,TextInput,Platform,ActivityIndicator } from 'react-native'
import { RaisedTextButton } from 'react-native-material-buttons'
import Icon from 'react-native-vector-icons/Ionicons'
import { LoginStyle, RegisterStyle } from 'styles'
import Modal from 'react-native-modal'
import { RESET_PASSWORD } from 'react-native-dotenv'
import NetInfo from "@react-native-community/netinfo"


export default class ResetPassword extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	id:null,
	  	visibility:false,
	  	networkVisibility:false,
      	isConnected:false,
      	password:'',
      	confirmPassword:'',
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

	componentWillMount(){
		this.setState({
			id:this.props.navigation.getParam('userIdentity','0')
		})
	}


	componentWillUnMount(){
		this.subscription = NetInfo.removeEventListener('connectionChange')
	}

	_closeNetworkModal = () => {
      this.setState({networkVisibility: false})
    }

    /**
  * Check if youre connected to the internet
  * Validate the password inputs
  * Redirect them to login screen to login
  */


	handleSubmit = () => {
		const { password, confirmPassword, visibility, networkVisibility, isConnected, errorMsg,id } = this.state
		const listener = data => {
		  NetInfo.isConnected.fetch().then(isConnected => {
		    this.setState({isConnected})
		  })
		}
		    
		this.subscription = NetInfo.addEventListener('connectionChange',listener);
		if(isConnected){
		  if(password == ''){
		    this.setState({errorMsg:'Password field is empty'})
		  }else if(confirmPassword == ''){
		    this.setState({errorMsg:'Confirm password field is empty'})
		  }else if(password != confirmPassword){
		    this.setState({errorMsg:'Your password fields are not equal'})
		  }else if(password.length < 6){
		    this.setState({errorMsg:'Your password should be more than 6 charaters'})
		  }
		  else{
		    this.setState({visibility: true})
		    fetch(RESET_PASSWORD,{
		      method:'POST',
		      headers:{
		        'Accept':'application/json',
		        'Content-Type':'application/json'
		      },
		      body: JSON.stringify({
		        id,
		        password
		      })
		    })
		    .then((data) => data.json())
		    .then(data => {
		      if(data){
		        // this.setState({visibility:false})
		        this.props.navigation.navigate('Login')
		      }else{
		        this.setState({visibility:false,errorMsg:'The user does not exists'})
		      }
		    })
		  }
		}else{
		  this.setState({networkVisibility:true})
		}
	}



	render() {
      	const { email, visibility, networkVisibility, isConnected, password, confirmPassword } = this.state
		return (
			<ScrollView style={LoginStyle.container}>
	          <StatusBar hidden />
	          <Image source={require('../assets/loginPic.jpg')} style={LoginStyle.image} />
	            <View style={LoginStyle.loginView}>
	              <Text style={LoginStyle.loginText}>Reset Password</Text>
	            </View>
	            <KeyboardAvoidingView>
	              <View style={LoginStyle.textInputView}>
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
	            <View style={{justifyContent:'center',alignItems:'center'}}>
	              <Text style={{color: 'red',fontSize: 12}}>{this.state.errorMsg}</Text>
	            </View>
	            <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10,}}>
	              <RaisedTextButton title="Save" onPress={this.handleSubmit} style={{width: '80%', borderRadius: 5,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
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