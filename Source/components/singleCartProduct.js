import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import { RaisedTextButton } from 'react-native-material-buttons'
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable'

class SingleCartProduct extends Component {
	constructor(props) {
	  super(props);

	  // this.props = {
	  // 	numberOfItems:1
	  // }
	}

	// addItem = () => {
	// 	this.setState(prevState => ({
	// 			numberOfItems:prevState.numberOfItems+1
	// 		})
	// 	)
	// }

	// removeItem = () => {
	// 	if(this.state.numberOfItems > 1 ){
	// 		this.setState(prevState => ({
	// 				numberOfItems:prevState.numberOfItems-1
	// 			})
	// 		)
	// 	}
	// }

	removeFromCart = () => {
		this.props.removeItemFromCart(this.props.product)
	}

	render(){
		// const { numberOfItems } = this.state
		const { product } = this.props
	    return (
	        <View style={styles.container} >
	           <View style={{marginLeft:5}}>
	            <Image source={require('../assets/menu1.jpg')} style={{height:'100%',width:70}} />
	           </View>
	           <View style={styles.middleSection}>
	           	<Text style={{color:'#464849',fontFamily: 'arial',fontWeight:'bold',fontSize:17}}>{product.productName}</Text>
	           	<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:80}}>
	           		<TouchableOpacity onPress={this.removeItem} ><Text style={{color:'red',fontSize:30,fontWeight:'bold'}}>-</Text></TouchableOpacity>
	           		<Text style={{color:'#000',fontSize:17,fontWeight:'bold'}} >1</Text>
	           		<TouchableOpacity onPress={this.addItem} ><Text style={{color:'red',fontSize:25,fontWeight:'bold'}}>+</Text></TouchableOpacity>
	           	</View>
	           	<View>
	              <RaisedTextButton title={"Remove from cart"} onPress={this.removeFromCart} style={{width: '100%', borderRadius: 5,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
	           	</View>
	           </View>
	           <View style={{backgroundColor: 'red', justifyContent:'center',alignItems:'center',paddingHorizontal:5, paddingVertical:5,borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
	           	<Text style={{color:'#fff', fontSize:15, fontFamily: 'calibri'}}>GHc {product.price}</Text>
	           </View>
	        </View>
	    )
	}
}

const mapDispatchToProps = dispatch => {
	return{
		removeItemFromCart:(product) =>dispatch({
			type:'REMOVE_FROM_CART',
			payload:product
		})
	}
}
SingleCartProduct = Animatable.createAnimatableComponent(SingleCartProduct)
export default connect(null,mapDispatchToProps)(SingleCartProduct)


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height:120,
		width: '100%',
		borderRadius: 10,
		marginRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
		marginBottom:20,
		paddingVertical:10
	},
	middleSection:{
		justifyContent:'space-between',
		alignItems:'center',
		height:'100%'
	}
})

