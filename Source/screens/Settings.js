import React from 'react'
import { Alert, View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import { Header, SettingsList } from 'components'
import { ProfileStyle, HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextButton } from 'react-native-material-buttons'
import AsyncStorage from '@react-native-community/async-storage'
import ModalLogout from 'react-native-modal'

class Settings extends React.Component{
   constructor(props) {
        super(props)
        this.state = {
          visibility: false,
          search: '',
          logout:false
        }
    }

    handleLogout = () => {
      this.setState({logout: true})
      AsyncStorage.clear();
      this.setState({logout:false})
      this.props.navigation.navigate('Login');
    }

    confirmSignOut = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout",
        ['OK','Cancel']
      )
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

            {/*For authentication*/}
              <ModalLogout isVisible={this.state.logout} animationIn="slideInLeft" animationInTiming={1000} animationOut="bounceOutUp" animationOutTiming={1000}>
                <View style={{ height: 150, width: '100%', backgroundColor: '#fff', borderRadius: 15, }}>
                  <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={50} color='red' />
                  </View>
                </View>
              </ModalLogout>

            {/*this is for the view itself*/}
            <ScrollView style={ProfileStyle.mainDetails} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>Settings</Text>
                </View>
                <View style={ProfileStyle.customerDetails}>                
                    <SettingsList title="Rate Us" />
                    <SettingsList title="Suggest Improvement" />
                    <SettingsList title="Legal" />
                    <SettingsList title="How to use app" />
                </View>
                <TextButton title="Sign Out" onPress={this.confirmSignOut} titleColor="red"/>
            </ScrollView>
            
        </View>
      )
    }
}

export default Settings