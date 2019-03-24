import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity } from 'react-native'
import { Header } from 'components'
import { HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'

class Home extends React.Component {
    constructor(props) {
        super(props);
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
        <View style={HomeStyle.container}>
            <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} / >
            <Text>Home</Text>
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