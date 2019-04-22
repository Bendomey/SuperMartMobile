import React from 'react'
import { View, Text, Modal, Platform, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { Header, SingleCartProduct} from 'components'
import { ProfileStyle, HomeStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextButton } from 'react-native-material-buttons'
import {connect} from 'react-redux'

class Cart extends React.Component{
   constructor(props) {
        super(props)
        this.state = {
          visibility: false,
          search: '',
        }
    }

    _handleOpenDrawer = () => {
      alert('open drawer')
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


    render() {
      const { visibility, search } = this.state
      return (
        <View style={ProfileStyle.container}>
            <StatusBar backgroundColor="red" barStyle="light-content"/>
            <Header _openDrawer={this._handleOpenDrawer} openSearchStack={this._handleOpenSearchStack} openNotification={this._handleOpenNotificationModal} />
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
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',marginBottom:15}} >
                    <Icon name={Platform.OS === 'android' ? 'md-basket' : 'ios-basket'} size={50} color="orange" />
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000',marginLeft:10}}>Shopping Cart</Text>
                </View>
                {
                    this.props.CartItems.length > 0 ?
                    this.props.CartItems.map((item,index) => {
                        return(
                            <SingleCartProduct animation="slideOutDown" key={index} product={item} />
                        )
                    })
                    // <Text>Total</Text> 
                    :
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#999a9b',fontWeight:'bold'}}>Nothing To Show</Text>
                    </View>
                }
            </ScrollView>
            {
                this.props.CartItems.length > 0 && (
                    <View style={{backgroundColor: '#fff',width:'100%'}}>
                        <TouchableOpacity style={{backgroundColor:'red',height:50,justifyContent:'center',alignItems:'center',marginHorizontal:30,marginBottom:5,borderRadius:10}}>
                            <Text style={{color:'#fff'}} >Proceed To Checkout</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
      )
    }
}


const mapStateToProps = (state) => {
    return{
        CartItems:state
    }
}

export default connect(mapStateToProps)(Cart)