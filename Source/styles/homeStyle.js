import { StyleSheet } from 'react-native'

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6f6'
    },
    modalHeader: {
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    textViewNode: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#dddd'
    }
})

export default HomeStyle