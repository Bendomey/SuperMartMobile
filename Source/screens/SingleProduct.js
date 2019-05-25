import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    Modal,
    Platform,
    TextInput,
    ScrollView
} from 'react-native';
import {
    Button,
    TextButton
} from 'react-native-material-buttons'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Header,
    SingleListProfile,
    PaymentAndAddress
} from 'components'
import {
    HomeStyle
} from 'styles'

class SingleProduct extends React.Component{

    constructor(props){
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
        this.setState({
            visibility: true
        })
    }

    _handleOpenNotificationModal = () => {
        alert('notification')
    }

    _handleCloseSearchModal = () => {
        this.setState({
            visibility: false
        })
    }
    render() {
        const { visibility, search } = this.state
      return (
        <View style={{ flex:1}}>
            <StatusBar backgroundColor = "red" barStyle = "light-content" />
            <Header _openDrawer = {this._handleOpenDrawer} openSearchStack = {this._handleOpenSearchStack} openNotification = {this._handleOpenNotificationModal}/>

            <ScrollView style={{backgroundColor:"#f5f5f5",flex:1}}>
                <View style={{alignItems:'center', justifyContent:'center', padding: 40}}>
                    <Image source={require('../assets/menu1.jpg')} style={{height: 200, width: 170}} />
                </View>
                <View style={{flex:2,backgroundColor: '#fff',marginBottom:5, borderRadius:50, paddingTop:30, paddingBottom:30}}>
                    <View>
                        <Text style={{color:'#000', fontSize:30, textAlign:'center', fontWeight:'bold'}}>CORN FLAKES</Text>
                    </View>
                    <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row', marginTop:10}}>
                        <View style={{backgroundColor:'red', borderTopRightRadius:25, borderBottomRightRadius:25, width: '50%', height:60, alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff', fontSize:27, fontWeight:'bold'}}>GHc 250</Text>
                        </View>
                        <View style={{width:'45%',height:60, alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                            <TouchableOpacity style={{backgroundColor:'#f5f5f5', justifyContent:'center',alignItems:'center',borderRadius:15}}>
                                <Text style={{color:"red", fontWeight:'bold',fontSize:30,paddingLeft:10,paddingRight:10}}>-</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize:22}}>2</Text>
                            <TouchableOpacity style={{backgroundColor:'#f5f5f5', justifyContent:'center',alignItems:'center',borderRadius:15}}>
                                <Text style={{color:"red", fontWeight:'bold',fontSize:25,paddingLeft:10,paddingRight:10}}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginHorizontal:30,justifyContent:'center', marginTop:10, alignItems:'center'}}>
                        <Text style={{textAlign:"justify", fontSize:17}}>
                            Fat Free, low fat, nutritious and healthy cereal. Goes well with the semi-skimmed Even Lorem Ipsum Navel There is more to be done so am on it..
                        </Text>
                    </View>
                    <View style={{marginTop:10, marginLeft:20,marginRight:150}}>
                        <TextButton title="Add To Cart" onPress={this.addToCart} titleColor="white" style={{backgroundColor:'#f3c539',height:50,borderRadius:15}}/>
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
    };
}

export default SingleProduct