import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { Header, SettingsList } from 'components'
import { ProfileStyle, HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextButton } from 'react-native-material-buttons'

class Settings extends React.Component{
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
                <View>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>Settings</Text>
                </View>
                <View style={ProfileStyle.customerDetails}>                
                    <SettingsList title="Rate Us" />
                    <SettingsList title="Suggest Improvement" />
                    <SettingsList title="Legal" />
                    <SettingsList title="How to use app" />
                </View>
                <TextButton title="Sign Out" titleColor="red"/>
            </ScrollView>
        </View>
      )
    }
}

export default Settings