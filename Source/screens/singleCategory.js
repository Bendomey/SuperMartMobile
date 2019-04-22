import React from 'react'
import { View, Text, TextInput, Modal, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { Header, CardForSingleProduct, cardForSingleProduct } from 'components'
import { HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          visibility: false,
          search: ''
        }
    }

    _handleOpenSearchStack = () => {
      this.setState({visibility: true})
    }

    _handleOpenNotificationModal = () => {
      alert('notification')
    }

    _handleCloseSearchModal = () => {
      this.setState({visibility: false})
    }

    _handleGoBack = () => {
    	this.props.navigation.navigate('Home');
    }

	render() {
      const { visibility, search } = this.state
		return (
			<View style={HomeStyle.container}>
	    	    <StatusBar backgroundColor="red" barStyle="light-content"/>
		        <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
				<ScrollView >
				<View style={HomeStyle.cardView}>
					
					<View style={{justifyContent:'space-between', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
						<Text style={{marginLeft: 15, color: '#000', fontSize:20, marginBottom: 15, fontWeight: 'bold'}}>Drinks</Text>
						<TouchableOpacity onPress={this._handleGoBack} style={{justifyContent:'space-between', flexDirection: 'row', alignItems:'center'}}>
							<Icon name={Platform.OS == 'android' ? 'md-arrow-round-back':'ios-arrow-round-backward'} size={20} color="#000"/>
							<Text style={{marginLeft: 15, color: '#000', fontSize:15}}>Categories</Text>
						</TouchableOpacity>
					</View>
					{/*show products here*/}
					<View style={{marginHorizontal: 25}}>
						<CardForSingleProduct imgSrc={require('../assets/menu1.jpg')} productName='COCA COLA' price={20} />
						<CardForSingleProduct imgSrc={require('../assets/menu1.jpg')} productName='PEPSI' price={20} />
						<CardForSingleProduct imgSrc={require('../assets/menu1.jpg')} productName='FANTA' price={20}/>
						<CardForSingleProduct imgSrc={require('../assets/menu1.jpg')} productName='SPRITE' price={20}/>
						<CardForSingleProduct imgSrc={require('../assets/menu1.jpg')} productName='MIRINDA' price={20}/>
					</View>
				</View>
				</ScrollView>
				<Modal visible={visibility} animationType={"fade"}>
		            <View style={HomeStyle.modalHeader}>
		              <TouchableOpacity onPress={this._handleCloseSearchModal}>
		                <Icon name={Platform.OS == 'android' ? 'md-arrow-round-back' : 'ios-arrow-round-back'} size={Platform.OS == 'android' ? 25 : 1} color={'#000'} />
		              </TouchableOpacity>
		              <TextInput autoFocus={true} returnKeyType={'search'} style={HomeStyle.textViewNode} placeholderTextColor={"black"} value={search} onChangeText={(value) => this.setState({search: value})} placeholder={"Search something..."} />
		            </View>
	          	</Modal> 
			</View>			
		);
	}
}

export default Category