import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { Header, CardForProduct, CardForCategory } from 'components'
import { HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visibility: false,
          search: ''
        }
    }

    async componentDidMount(){
      let data = await AsyncStorage.getItem('user')
      console.log(data);
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

    _handleGoToProduct = () => {
      this.props.navigation.navigate('SingleCategory')
    }

    render() {
      const { visibility, search } = this.state
      return (
        <View style={HomeStyle.container}>
          <StatusBar backgroundColor="red" barStyle="light-content"/>
          <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
          <ScrollView >
            <View style={HomeStyle.cardView}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 15, marginBottom: 10}} >
                <CardForProduct />
                <CardForProduct />
                <CardForProduct />
              </ScrollView>
              <Text style={{marginLeft: 15, color: '#000', fontSize:22, marginBottom: 15}} >Browse Categories</Text>
              <View style={HomeStyle.categoryView}>
                <CardForCategory onClickOnCat={this._handleGoToProduct} catName="Fresh Foods" />
                <CardForCategory catName="Food Cupboard"/>
                <CardForCategory catName="Oil & Sauces"/>
                <CardForCategory catName="Drinks"/>
                <CardForCategory catName="Snacks"/>
                <CardForCategory catName="Toiletries"/>
                <CardForCategory catName="Health & Nature"/>
                <CardForCategory catName="Frozen Foods"/>
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
      )
    }
}

export default Home