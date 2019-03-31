import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const list = (props) => {
	let title = (props.title).trim()
	if(title.length > 20){
		title = title.slice(0,20) + '...'
	}else{
		title = title
	}
	return(
		<View style={{width: '100%', borderBottomWidth:1, borderBottomColor: '#ddd', justifyContent:'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 8}}>
			<View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
				<Icon size={20} color='red' name={Platform.OS == 'android' ? `md-${props.iconName}` : `ios-${props.iconName}`} />
				<Text style={{marginLeft: 10}}>{title}</Text>
			</View>
			<TouchableOpacity>
				<Text style={{color: '#ddd'}}>Change</Text>
			</TouchableOpacity>
		</View>
	)
}


export default list