import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, ActivityIndicator } from 'react-native'
import { Header, SingleListProfile, PaymentAndAddress } from 'components'
import { ProfileStyle, HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, TextButton } from 'react-native-material-buttons'
import AsyncStorage from '@react-native-community/async-storage'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          visibility: false,
          search: '',
          data:null,
          load:true
        }
    }

    componentWillMount(){
      console.log("Hello");
    }


    async componentDidMount(){
      await AsyncStorage.getItem('user')
      .then(data => JSON.parse(data))
      .then((data) =>{
        this.setState({data,load:false})
        this.forceUpdate()

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

    _handleEditProfileButton = () => {
      this.props.navigation.navigate('EditProfile',{
        userData:this.state.data
      })
    }

    render() {
      const { visibility, search, data } = this.state
      
        if(this.state.load == false){
          return (
          <View style={ProfileStyle.container}>
              <StatusBar backgroundColor="red" barStyle="light-content"/>
              <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
              <Modal visible={visibility} animationType={"fade"}>
                <View style={HomeStyle.modalHeader}>
                  <TouchableOpacity onPress={this._handleCloseSearchModal}>
                    <Icon name={Platform.OS == 'android' ? 'md-arrow-round-back' : 'ios-arrow-round-back'} size={Platform.OS == 'android' ? 25 : 1} color={'#000'} />
                  </TouchableOpacity>
                  <TextInput autoFocus={true} returnKeyType={'search'} style={HomeStyle.textViewNode} placeholderTextColor={"black"} value={search} onChangeText={(value) => this.setState({search: value})} placeholder={"Search something..."} />
                </View>
              </Modal>

              {/*this is for the view itself*/}
              <ScrollView style={ProfileStyle.mainDetails} showsVerticalScrollIndicator={false}>
                  <View style={ProfileStyle.profileImageView}>
                      <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection:'row', paddingHorizontal: 50, width: '100%'}}>
                          <View>
                              <Image source={require('../assets/menu1.jpg')} style={ProfileStyle.image} />
                          </View>
                          <View style={ProfileStyle.textView}>
                              <Text style={ProfileStyle.UserName}>{data.customer_name}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={ProfileStyle.customerDetails}>                
                      <SingleListProfile title={data.customer_name} iconName='contact' />
                      <SingleListProfile title={data.customer_contact} iconName='call' />
                      <SingleListProfile title={data.customer_email} iconName='mail' />
                      <SingleListProfile title='*************' iconName='key' />
                      <View style={{marginTop: 10}}></View>
                      <PaymentAndAddress title="Edit Profile" onclick={this._handleEditProfileButton} subTitle="Change profile details" />
                      <PaymentAndAddress title="Payment Method" subTitle="Add  or Remove a Payment Method" />
                      <PaymentAndAddress title="Address" subTitle="Add  or Remove a Delivery Address" />
                      <PaymentAndAddress title="Terms Of Use" />
                      <TextButton title="Delete My Account" titleColor="red"/>
                      
                  </View>
              </ScrollView>
          </View>)      
        }else{
          return (
          <View>
            <ActivityIndicator />
          </View>)
        }
    }
}

export default Profile