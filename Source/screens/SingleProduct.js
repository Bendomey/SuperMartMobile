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
    ScrollView,
    ToastAndroid
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
import {DOMAIN} from 'react-native-dotenv'
import {connect} from 'react-redux'


class SingleProduct extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            visibility: false,
            search: '',
            data:[],
            numberOfItems:1
        }
    }


    addItem = () => {
        this.setState(prevState => ({
                numberOfItems:prevState.numberOfItems+1
            })
        )
    }

    removeItem = () => {
        if(this.state.numberOfItems > 1 ){
            this.setState(prevState => ({
                    numberOfItems:prevState.numberOfItems-1
                })
            )
        }
    }

    addToCart = () => {
        const { data } = this.state
        data.numberOfItems = this.state.numberOfItems;
        this.props.addItemsToCart(data)
        ToastAndroid.showWithGravity(`Added to cart`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }


    componentDidMount(){
        this.setState({
            data:this.props.navigation.getParam('productData','nothing')
        })
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
        const { visibility, search, data, numberOfItems } = this.state
      return (
        <View style={{ flex:1}}>
            <StatusBar backgroundColor = "red" barStyle = "light-content" />
            <Header _openDrawer = {this._handleOpenDrawer} showBack={true} goBack={() => this.props.navigation.goBack()} openSearchStack = {this._handleOpenSearchStack} openNotification = {this._handleOpenNotificationModal}/>

            <ScrollView style={{backgroundColor:"#f5f5f5",flex:1}}>
                <View style={{alignItems:'center', justifyContent:'center', padding: 40}}>
                    <Image source={{uri:DOMAIN+data.product_img}} style={{height: 200, width: 170}} />
                </View>
                <View style={{flex:2,backgroundColor: '#fff',marginBottom:5, borderRadius:35, paddingTop:20, paddingBottom:30}}>
                    <View>
                        <Text style={{color:'#000', fontSize:30, textAlign:'center', fontWeight:'bold'}}>{data.product_name}</Text>
                    </View>
                    <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row', marginTop:10}}>
                        <View style={{backgroundColor:'red', borderTopRightRadius:25, borderBottomRightRadius:25, width: '50%', height:60, alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff', fontSize:27, fontWeight:'bold'}}>GHc {data.product_price}</Text>
                        </View>
                        <View style={{width:'45%',height:60, alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.removeItem} style={{backgroundColor:'#f5f5f5', justifyContent:'center',alignItems:'center',borderRadius:15}}>
                                <Text style={{color:"red", fontWeight:'bold',fontSize:30,paddingLeft:10,paddingRight:10}}>-</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize:22}}>{numberOfItems}</Text>
                            <TouchableOpacity onPress={this.addItem} style={{backgroundColor:'#f5f5f5', justifyContent:'center',alignItems:'center',borderRadius:15}}>
                                <Text style={{color:"red", fontWeight:'bold',fontSize:25,paddingLeft:10,paddingRight:10}}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginHorizontal:30,justifyContent:'center', marginTop:10, alignItems:'center'}}>
                        <Text style={{textAlign:"justify", fontSize:17}}>
                            {data.product_description}
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
const mapDispatchToProps = dispatch => {
    return{
        addItemsToCart:(product) =>dispatch({
            type:'ADD_TO_CART',
            payload:product
        })
    }
}

export default connect(null,mapDispatchToProps)(SingleProduct)