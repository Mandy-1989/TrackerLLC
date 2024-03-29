import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import AppImages from '../assets/images';
export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('TabNavigator')
        }, 3000)
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
                <Image resizeMode={'contain'} source={AppImages.icon_image} style={{ height: 250, width: 250 }} />
            </View>
        )
    }
}