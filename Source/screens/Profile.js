import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native'
import { Header, SingleListProfile, PaymentAndAddress } from 'components'
import { ProfileStyle, HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-material-buttons'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          visibility: false,
          search: ''
        }
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


    render() {
      const { visibility, search } = this.state
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
                            <Text style={ProfileStyle.UserName}>John Doe</Text>
                        </View>
                    </View>
                </View>
                <View style={ProfileStyle.customerDetails}>                
                    <SingleListProfile title='John Doe' iconName='contact' />
                    <SingleListProfile title='0561516436' iconName='call' />
                    <SingleListProfile title='domeybenjamin1@gmail.com' iconName='mail' />
                    <SingleListProfile title='*************' iconName='key' />
                    <View style={{marginTop: 10}}></View>
                    <PaymentAndAddress title="Payment Method" subTitle="Add  or Remove a Payment Method" />
                    <PaymentAndAddress title="Address" subTitle="Add  or Remove a Delivery Address" />
                    <PaymentAndAddress title="Terms Of Use" />
                    <TouchableOpacity style={{width: '100%'}}>
                        <Text style={{color: 'red'}}>Delete My Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
      )
    }
}

export default Profile