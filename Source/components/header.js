import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { HeaderStyle } from 'styles'
import Icon from 'react-native-vector-icons/Ionicons'

const Header = (props) => {
    return(
        <View style={HeaderStyle.container}>
            {
                (props.showBack === true) && ( 
                <TouchableOpacity onPress={props.goBack}>
                    <Icon name={Platform.OS == 'android' ? 'md-arrow-round-back' : 'ios-arrow-round-back'} size={Platform.OS == 'android' ? 25: 1} color={'#fff'}/>
                </TouchableOpacity>)
            }
            <View style={HeaderStyle.applicationName}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20,}}>Super Mart</Text>
            </View>
            <View style={HeaderStyle.searchAndNotification}>
                <TouchableOpacity onPress={props.openSearchStack}>
                    <Icon name={Platform.OS == 'android' ? 'md-search' : 'ios-search'} size={Platform.OS == 'android' ? 25: 1} color={'#fff'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.openNotification}>
                    <Icon name={Platform.OS == 'android' ? 'md-notifications-outline' : 'ios-notifications-outline'} size={Platform.OS == 'android' ? 25: 1} color={'#fff'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header