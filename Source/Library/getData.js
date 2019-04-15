import AsyncStorage from '@react-native-community/async-storage'


export default getData = async (key) => {
	try{
		const data = await AsyncStorage.getItem(key);
		return data;
	}catch(e){
		alert('something happened',e);
	}
	
}