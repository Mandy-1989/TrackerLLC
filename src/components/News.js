import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import AppImages from '../assets/images';
import { WebView } from 'react-native-webview';
import StyleConfig from '../assets/StyleConfig'
import colors from '../constants/Colors';

export default class WebLink extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowIndicator: true
        }
    }

    showIndicator() {
        if (this.state.isShowIndicator) {
            return <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={'black'} />
            </View>
        }
    }

    hideLoading() {
        this.setState({ isShowIndicator: false });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.firstContainer}>
                    <Image resizeMode={'contain'} source={AppImages.icon_image} style={{ height: 80, width: 80 }} />
                    <Text style={[styles.headerText]}>
                        {'COVID-19 Global Cases'}
                    </Text>
                </View>
                {this.showIndicator()}
                <WebView source={{ uri: 'https://rxmedizin.com/news' }} onLoad={() => this.hideLoading()} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    firstContainer: {
        flexDirection: 'row',
        margin: 5,
        alignItems:'center',
        marginTop:StyleConfig.countPixelRatio(20),
        marginBottom:StyleConfig.countPixelRatio(10)
    },
    headerText: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 5,
        color: colors.grey,
        fontFamily: 'FiraSans-Medium'
    }
})