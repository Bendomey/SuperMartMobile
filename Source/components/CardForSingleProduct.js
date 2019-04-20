import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const CardForSingleProduct = (props) => {
    return (
        <View style={styles.container} >
           <View></View>
           <View>
           	
           </View>
           <View style={{backgroundColor: 'red', justifyContent:'center',alignItems:'center',paddingHorizontal:20, paddingVertical:5,borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
           	<Text style={{color:'#fff', fontSize:17, fontFamily: 'calibri'}}>GHc 120</Text>
           </View>
        </View>
    )
}

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
		marginBottom:30
	},
})

export default CardForSingleProduct