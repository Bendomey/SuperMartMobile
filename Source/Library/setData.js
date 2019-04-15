import AsyncStorage from '@react-native-community/async-storage'


export default setData = async (key,value) => {
	try{
		AsyncStorage.setItem(key,value);
		return true;
	}catch(e){
		alert('Something happened',e);
	}
}