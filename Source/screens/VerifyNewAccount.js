import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'

export default class VerifyNewAccount extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	visibility:false
	  };
	}

	_onFullfill = (code) => {
		// if(code == '12345'){
			// alert(code)
			// this.setTimeout(function() {
				this.setState({visibility:true})
			// }, 1000);
      		// this.props.navigation.navigate("MainTabs")
		// }
	}

	render() {
		return (
			<View style={styles.container}>
				<Icon name="md-checkbox-outline" size={50} style={{marginTop:10}} color="red" />
				<Text style={styles.topic}>Verify Your Phone Number</Text>
				<Text style={{textAlign: 'center', fontFamily: 'calibri', marginHorizontal:10, marginBottom: 10}}>Please enter the code you have received by SMS in order to verify your account</Text>
				<TouchableOpacity>
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
				/>

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