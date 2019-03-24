import { StyleSheet } from 'react-native'

const Header = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    searchAndNotification:{
        width: 55,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default Header