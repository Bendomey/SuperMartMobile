import React, {Component} from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'


class Loading extends Component {
	constructor(props) {
		super(props);
		this.bootstrap()
	}

	bootstrap = async () => {
		try{
			const data = await AsyncStorage.getItem('user');
			this.props.navigation.navigate(data ? 'MainTabs':'Login')
		}catch(e){
			alert('error',e)
		}

	}

	render(){
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'	
	}
})

export default Loading