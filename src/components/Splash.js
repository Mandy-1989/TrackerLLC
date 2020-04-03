import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppImages from '../assets/images';
import * as DeviceInfo from '../constants/DeviceInfo';

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

                <Text style={styles.txtVersion}>
                    v: {DeviceInfo.getVersionCode()}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txtVersion: {
        margin: 10,
        color: 'black',
        fontSize: 14,
        fontFamily: "FiraSans-Medium",
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})