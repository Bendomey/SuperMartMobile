import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#f5f6f6'
    },
    mainDetails: {
    	flex: 1,
    	marginHorizontal: 25,
    	paddingTop: 15
    },
    profileImageView:{
    	height: 100,
    	width: '100%',
    	display: 'flex',
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: '#fff',
    	elevation: 1,
    	borderRadius: 15
    },
    imageWrapper: {
    	height:80,
    	width: 80,
    	borderWidth: 5,
    	borderColor: 'red',
    	borderRadius: 50
    },
    image: {
    	height:80,
    	width: 80,
    	borderWidth: 5,
    	borderColor: 'red',
    	borderRadius: 50,
    	padding: 5
    },
    textView: {
    	justifyContent: 'center', 
    	width: '70%',
    	marginLeft: 20,
    },
    UserName: {
    	fontWeight: 'bold',
    	fontSize: 20
    },
    customerDetails:{
    	width: '100%',
    	display: 'flex',
    	// justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: '#fff',
    	elevation: 1,
    	borderRadius: 15,
    	marginVertical: 30,
    	paddingVertical:20,
    	paddingHorizontal:20,
    }
})

export default styles