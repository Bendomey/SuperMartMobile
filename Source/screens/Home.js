import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Header, CardForProduct, CardForCategory } from 'components'
import { HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { CATEGORIES } from 'react-native-dotenv'
import NetInfo from "@react-native-community/netinfo"
import fetch from 'react-native-fetch-polyfill'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visibility: false,
          search: '',
          isConnected:true,
          refreshTryAgain:false,
          catData:[],
          featuredProduct:[],
          getCategories:false,
          refreshing:false
        }
    }

    componentDidMount(){
      NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected})   
          this.renderData(isConnected)  
      })

    }

    _handleRefreshPage = () => {
      this.setState({refreshTryAgain:true})
      NetInfo.isConnected.fetch().then(isConnected => {
          this.setState({isConnected,refreshTryAgain:false})
          this.renderData(isConnected)
      })
    }

    renderData = async (isConnected) => {
      if(isConnected == true){
            this.setState({getCategories:true})
            try{
              const getCat = await fetch(CATEGORIES,{
                timeout:3000
              })
              const data = await getCat.json()
              this.setState({
                  catData:data['categories'],
                  getCategories:false
              })
            }catch(e){
              this.setState({
                getCategories:false,
                isConnected:false
              })
            }
      }
    }
    
    renderDataForRefresh = async (isConnected) => {
      if(isConnected == true){
            this.setState({refreshing:true})
            try{
              const getCat = await fetch(CATEGORIES,{
                timeout:3000
              })
              const data = await getCat.json()
              this.setState({
                  catData:data['categories'],
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
          this.renderDataForRefresh(isConnected)
      })
    }

    _handleOpenDrawer = () => {
      alert('open drawer')
    }

    _handleOpenSearchStack = () => {
      // alert('open search')
      this.setState({visibility: true})
    }

    _handleOpenNotificationModal = () => {
      alert('notification')
    }

    _handleCloseSearchModal = () => {
      this.setState({visibility: false})
    }

    _handleGoToProduct = (name) => {
      this.props.navigation.navigate('SingleCategory',{
        'catName':name
      })
    }

    render() {
      const { visibility, search, isConnected } = this.state
      if(!isConnected){
        return(
          <View style={{flex:1}}>
            <StatusBar backgroundColor="red" barStyle="light-content"/>
            <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >

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
          </View>
        )
      }else{
        return (
          <View style={HomeStyle.container}>
            <StatusBar backgroundColor="red" barStyle="light-content"/>
            <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._handleRefresh}
                />
              } 
            >
              <View style={HomeStyle.cardView}>
                {
                  (this.state.featuredProduct.length != 0) && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 15, marginBottom: 10}} >
                      <CardForProduct />
                      <CardForProduct />
                      <CardForProduct />
                    </ScrollView>
                  )
                }
                <Text style={{marginLeft: 15, color: '#000', fontSize:22, marginBottom: 15}} >Browse Categories</Text>
                
                  {
                    (this.state.getCategories == true) ?
                      <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                        <ActivityIndicator color="red" size={40} />
                      </View>
                    :
                      
                      (this.state.catData.length > 0) &&(
                        <View style={HomeStyle.categoryView}>
                          {      
                            this.state.catData.map(data => {
                              return (
                                  <CardForCategory key={data.id} image={{uri:'https://supermartgh.000webhostapp.com/storage/'+data.category_img}} onClickOnCat={() => this._handleGoToProduct(data.category_name)} catName={data.category_name} />
                              )
                            })
                          }
                        </View>

                      )
                      
                  }
                
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
        )
      }
    }
}

export default Home