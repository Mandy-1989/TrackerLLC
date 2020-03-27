import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import AppImages from '../assets/images';
import { WebView } from 'react-native-webview';

let clickType;

export default class WebLink extends Component {
    constructor(props) {
        super(props)
        clickType = this.props.navigation.state.params.data

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
        let webURL;
        switch (clickType) {
            case 1:
                webURL = "https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html";
                break;
            case 2:
                webURL = "https://rxmedizin.com/scheduling";
                break;
            case 3:
                webURL = "https://rxmedizin.com/news";
                break;
        }

        console.log("webURL:" + webURL)

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.firstContainer}>
                    <Image resizeMode={'contain'} source={AppImages.icon_image} style={{ height: 80, width: 80 }} />
                    <Text style={[styles.headerText]}>
                        {'COVID-19 Global Cases'}
                    </Text>
                </View>
                {this.showIndicator()}
                <WebView source={{ uri: webURL }} onLoad={() => this.hideLoading()} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    firstContainer: {
        flexDirection: 'row',
        margin: 5
    },
    headerText: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 5,
        fontFamily: 'FiraSans-Medium'
    }
})