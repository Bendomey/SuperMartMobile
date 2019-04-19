import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const list = (props) => {
	let title = (props.title).trim()
	if(title.length > 30){
		title = title.slice(0,30) + '...'
	}else{
		title = title
	}
	return(
		<View style={{width: '100%', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 8}}>
			<View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
				<Icon size={20} color='red' name={Platform.OS == 'android' ? `md-${props.iconName}` : `ios-${props.iconName}`} />
				<Text style={{marginLeft: 10}}>{title}</Text>
			</View>
		</View>
	)
}


export default list