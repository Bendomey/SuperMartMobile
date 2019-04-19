import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import NetInfo from "@react-native-community/netinfo"
import { VALIDATE_PHONE, RESEND_VERIFICATION_CODE } from 'react-native-dotenv'

export default class VerifyPhone extends React.Component{
	subscription = null;

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	id:navigation.getParam('userId'),
	  	contact:navigation.getParam('userContact'),
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
	* Check if code is equal to the code sent
	* Validate the user and log them in
	*/

	_onFullfill = (code) => {
		const { isConnected,id } = this.state
		const listener = data => {
	        NetInfo.isConnected.fetch().then(isConnected => {
	          this.setState({isConnected})
	        })
      	}
      	subscription = NetInfo.addEventListener('connectionChange',listener);  
		
		if(isConnected){
			this.setState({visibility:true})
			fetch(VALIDATE_PHONE,{
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body:JSON.stringify({
					id,
					validation_code:code
				})
			})
			.then((data) => data.json())
			.then(data => {
				if(data == false){
					this.setState({visibility:false, errorMsg:'Verification Code is wrong,try again'})
				}else{
					this.props.navigation.navigate('resetPassword',{
						userIdentity:data.id
					})					
				}
			})
			.catch((err) => {
				this.setState({visibility:false, errorMsg: 'Something went wrong, try again'})
			})
		}else{
			this.setState({networkVisibility:true})
		}
	}

	handleRetryCode = () => {
		const { isConnected,id } = this.state
		const listener = data => {
	        NetInfo.isConnected.fetch().then(isConnected => {
	          this.setState({isConnected})
	        })
      	}
      	subscription = NetInfo.addEventListener('connectionChange',listener);  
		if(isConnected){
			this.setState({visibility:true})
			fetch(RESEND_VERIFICATION_CODE,{
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					id,
				})
			})
			.then(data => data.json())
			.then(data => {
				if(data){
					this.setState({visibility:false});
				}else{
					this.setState({visibility:false,errorMsg:'Internal error occured, try again later'})
				}
			})
		}else{
			this.setState({networkVisibility:true})
		}
	}

	_closeNetworkModal = () => {
      this.setState({networkVisibility: false})
    }

    storeData = (key, value) => {
      AsyncStorage.setItem(key,value)
    }

	render() {
		let contact = toString(this.state.contact);
		let firstContact = contact.substr(0,3)
		let lastContact = contact.substr(6)
		let newContact = `${firstContact} xxx xxx${lastContact}`
		return (
			<View style={styles.container}>
				<Icon name="md-checkbox-outline" size={50} style={{marginTop:10}} color="red" />
				<Text style={styles.topic}>Verify Your Phone Number</Text>
				<Text style={{textAlign: 'center', fontFamily: 'calibri', marginHorizontal:10, marginBottom:2}}>Enter the verification code sent to this number {newContact}</Text>
                <Text style={{color: 'red',fontSize: 12}}>{this.state.errorMsg}</Text>
				<TouchableOpacity onPress={this.handleRetryCode}>
					<Text style={{color:"blue"}}>Please send another code</Text>
				</TouchableOpacity>
				<CodeInput
					space={5}
					className='border-b'
					size={50}
					inputPosition="center"
					onFulfill={(code) => this._onFullfill(code)}
					autofocus={false}
					ignoreCase={false}
					activeColor="red"
					inactiveColor="gray"
					KeyboardType="numeric"
				/>

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
	            <Modal isVisible={this.state.visibility} animationIn="slideInLeft" animationInTiming={1000} animationOut="bounceOutUp" animationOutTiming={1000}>
	              <View style={{ height: 150, width: '100%', backgroundColor: '#fff', borderRadius: 15, }}>
	                <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
	                  <ActivityIndicator size={50} color='red' />
	                </View>
	              </View>
	            </Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: '#f1f1f1'
	},
	topic:{
		fontSize: 30,
		fontFamily: 'arial',
		fontWeight: 'bold',
		color: '#000',
		marginBottom: 50,
		textAlign: 'left',
		marginHorizontal:50 
	}
})