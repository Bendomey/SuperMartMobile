import { StyleSheet } from 'react-native'


const registerStyle = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200
    },
    loginView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 25,
    },
    loginText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 23,
    },
    textInputView: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
    },
    textViewNode: {
        width: '85%',
        color: 'black',
        paddingLeft: 40,
    }
})

export default registerStyle