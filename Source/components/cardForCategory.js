import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const cardForCategory = (props) => {
	return(
		<View style={styles.container} >
        	<Image source={require('../assets/menu1.jpg')} style={styles.image} />
			<TouchableOpacity onPress={props.onClickOnCat} style={{width: 92, justifyContent: 'center'}}>
				<Text style={{textAlign:'center'}} >{props.catName}</Text>	
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		marginBottom: 10
	},
	image: {
		height: 95,
		width: 95
	}
})

export default cardForCategory