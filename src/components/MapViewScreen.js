import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'

class MapViewScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            country: []
        }
    }

    componentDidMount() {
        this.props.fetchCovidCountry_19List(1);
    }

    setMarkerPosition = (item) => {
        const assetLocations = {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long)
        };

        return (
            <Marker coordinate={assetLocations}
                image={require('../assets/images/pin.png')}
            />
        )
    }

    render() {
        // const item = this.props.navigation.getParams('item')
        const { covidInfo, isLoading } = this.props;
        switch (isLoading) {
            case true:
                return <View style={styles.viewParent}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                if (covidInfo.length > 0) {
                    if (this.state.country.length == 0) {
                        this.setState({
                            country: covidInfo
                        })
                    }
                }

                return (
                    <SafeAreaView style={styles.container}>
                        <TouchableOpacity style={styles.backIconContainer} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={"ios-arrow-back"} size={40} color={'black'} />
                        </TouchableOpacity>
                        <MapView provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                            mapType={Platform.OS === 'android' ? 'terrain' : 'standard'}
                            zoomEnabled={true}
                            zoomTapEnabled={true}
                            zoomControlEnabled={true}
                            // minZoomLevel={3}
                            style={styles.map}>
                            {this.state.country.map(item => (
                                this.setMarkerPosition(item)
                            ))}
                        </MapView>

                    </SafeAreaView>
                )
        }
    }
}

function mapStateToProps(state) {
    return {
        covidInfo: state.covidCountry.covidCountry,
        isLoading: state.covidCountry.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovidCountry_19List }, dispatch)
    }
}

const styles = StyleSheet.create({
    viewParent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    backIconContainer: {
        padding: StyleConfig.countPixelRatio(20),
        position: 'absolute',
        zIndex: 60,
        top: 0
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)