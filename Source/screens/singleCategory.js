import React from 'react'
import { View, Text, TextInput, Modal, Platform, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator,Image, RefreshControl, FlatList } from 'react-native'
import { Header, CardForSingleProduct, cardForSingleProduct } from 'components'
import { HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { SINGLE_CAT_PRODUCT } from 'react-native-dotenv'
import NetInfo from "@react-native-community/netinfo"
import fetch from 'react-native-fetch-polyfill'


const product = {
	"id":1,
	"productName":"COCA COLA",
	"price":20
}

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          visibility: false,
          search: '',
          catName:'',
          isConnected:true,
          getProduct:false,
          data:[],
          refreshTryAgain:false,
          refreshing:false
        }
    }

    componentWillMount(){
    	this.setState({})
    }

    componentDidMount(){
      NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected, catName:this.props.navigation.getParam('catName','Drinks')})   
          this.renderData(isConnected,this.state.catName)  
      })

    }

    renderData = async (isConnected,name) => {
    	if(isConnected == true){
            this.setState({getProduct:true})
            try{
              const getProduct = await fetch(SINGLE_CAT_PRODUCT + name,{
              	timeout:1000
              })
              const data = await getProduct.json()
              this.setState({
                  data:data,
                  getProduct:false
              })
            }catch(e){
              this.setState({
                getProduct:false,
                isConnected:false
              })
            }
      }
    }

    renderDataForRefresh = async (isConnected,name) => {
    	if(isConnected == true){
            this.setState({refreshing:true})
            try{
              const getProduct = await fetch(SINGLE_CAT_PRODUCT + name,{
              	timeout:1000
              })
              const data = await getProduct.json()
              this.setState({
                  data:data,
                  refreshing:false
              })
            }catch(e){
              this.setState({
                refreshing:false,
                isConnected:false
              })
            }
      }
    }

    _handleRefresh = () => {
      NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected})   
          this.renderDataForRefresh(isConnected,this.state.catName)
      })
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

    _renderItem = (data) => {
    	return (
			<CardForSingleProduct product={data.item} />
    	)
    }

	render() {
      const { visibility, search, getProduct, data, isConnected } = this.state
		return (
			<View style={HomeStyle.container}>
	    	    <StatusBar backgroundColor="red" barStyle="light-content"/>
		        <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
				{
					(isConnected == false) ?
						<View style={{flex:1,justifyContent:'center',alignItems:'center', }}>
				            <Image source={require('../assets/error.png')} style={{height:130,width:130}} />
				            <Text style={{textAlign:'center', color:'#000',fontSize: 30}}>Oh no!</Text>
				            <Text style={{textAlign:'center', color:'#B6B8BB',fontSize: 17}}>No internet connection found.Check your connection and try again</Text>
				            {
				              (this.state.refreshTryAgain == false) ?
				                <TouchableOpacity onPress={this._handleRefreshPage}>
				                  <View style={{alignItems:'center',flexDirection:'row',marginTop: 10}}>
				                    <Icon name={Platform.OS == 'android' ? 'md-refresh' : 'ios-refresh'} size={30} color="red" />
				                    <Text style={{marginLeft:10,fontSize:15}} >Try Again</Text>
				                  </View>
				                </TouchableOpacity>
				              :
				                <View style={{marginTop:10}}>
				                  <ActivityIndicator color="red" />
				                </View>
				            }
				          </View>
					:
						<ScrollView>
							<View style={HomeStyle.cardView}>
								
								<View style={{justifyContent:'space-between', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
									<Text style={{marginLeft: 15, color: '#000', fontSize:20, marginBottom: 15, fontWeight: 'bold'}}>{this.state.catName}</Text>
									<TouchableOpacity onPress={this._handleGoBack} style={{justifyContent:'space-between', flexDirection: 'row', alignItems:'center'}}>
										<Icon name={Platform.OS == 'android' ? 'md-arrow-round-back':'ios-arrow-round-backward'} size={20} color="#000"/>
										<Text style={{marginLeft: 15, color: '#000', fontSize:15}}>Categories</Text>
									</TouchableOpacity>
								</View>
								{/*show products here*/}
								{
									(getProduct == true) ?
										<ActivityIndicator color='red' size={30} />
									:
										<View style={{marginHorizontal: 25}}>
											{
												(data.length == 0) ?
													<View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
													<Text style={{fontSize:15}}>Products from this category is unavailable</Text>
													</View>
												:
													<FlatList 
														data={data}
														refreshing={this.state.refreshing}
														onRefresh={this._handleRefresh}
														renderItem={this._renderItem}
														initialItemToRender={10}
														keyExtractor={(item) => item.id.toString()}
													/>											
											}
											
										</View>
								}
									
								
							</View>
						</ScrollView>
				}
				
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