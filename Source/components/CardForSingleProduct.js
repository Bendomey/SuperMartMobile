import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import { RaisedTextButton } from 'react-native-material-buttons'
import {connect} from 'react-redux'

class CardForSingleProduct extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	numberOfItems:1
	  };
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
		this.props.addItemsToCart(this.props.product)
		ToastAndroid.showWithGravity(`Added ${this.props.product.product_name} to cart`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
	}

	render(){
		const { numberOfItems } = this.state
		const { product } = this.props
	    return (
	        <View style={styles.container} >
	           <View style={{marginLeft:5}}>
	            <Image source={{uri:'https://supermartgh.000webhostapp.com/storage'+product.product_img}} style={{height:'100%',width:70}} />
	           </View>
	           <View style={styles.middleSection}>
	           	<Text style={{color:'#464849',fontFamily: 'arial',fontWeight:'bold',fontSize:17}}>{product.product_name}</Text>
	           	<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:80}}>
	           		<TouchableOpacity onPress={this.removeItem} ><Text style={{color:'red',fontSize:30,fontWeight:'bold'}}>-</Text></TouchableOpacity>
	           		<Text style={{color:'#000',fontSize:17,fontWeight:'bold'}} >{numberOfItems}</Text>
	           		<TouchableOpacity onPress={this.addItem} ><Text style={{color:'red',fontSize:25,fontWeight:'bold'}}>+</Text></TouchableOpacity>
	           	</View>
	           	<View>
	              <RaisedTextButton title={"ADD TO CART"} onPress={this.addToCart} style={{width: '100%', borderRadius: 5,}} color={"red"} titleColor={'#fff'} shadeColor={"#fff"}/>
	           	</View>
	           </View>
	           <View style={{backgroundColor: 'red', justifyContent:'center',alignItems:'center',paddingHorizontal:5, paddingVertical:5,borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
	           	<Text style={{color:'#fff', fontSize:15, fontFamily: 'calibri'}}>GHc {product.product_price}</Text>
	           </View>
	        </View>
	    )
	}
}

const mapDispatchToProps = dispatch => {
	return{
		addItemsToCart:(product) =>dispatch({
			type:'ADD_TO_CART',
			payload:product
		})
	}
}

export default connect(null,mapDispatchToProps)(CardForSingleProduct)


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
		marginBottom:30,
		paddingVertical:10
	},
	middleSection:{
		justifyContent:'space-between',
		alignItems:'center',
		height:'100%'
	}
})

