import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('Dashboard')
        }, 3000)
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>App Icon</Text>
            </View>
        )
    }
}