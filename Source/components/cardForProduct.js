import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const CardForProduct = (props) => {
    return (
        <View style={styles.container} >
           {/* <Text>Hello World</Text>
            <View style={styles.innerView} >
            	<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 35}} >Zee's Honey</Text>
            	<Text style={{color: '#ffff', fontWeight: 'bold'}}><Text style={{color: '#fff',fontWeight: 'bold', fontSize: 35}}>20%</Text> World</Text>
            </View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'orange',
		height:165,
		width: 250,
		borderRadius: 40,
		marginRight: 20,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	innerView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap'
	},
})

export default CardForProduct