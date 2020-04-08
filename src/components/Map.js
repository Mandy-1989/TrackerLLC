import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import { mapStyle } from '../constants/MapStyle'

const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5
};

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            selectedData: [],
        }
    }

    async componentDidMount() {
        await fetch('https://corona.lmao.ninja/countries', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response", responseJson)
                this.setState({
                    country: responseJson
                })
            }
            )
    }

    setMarkerPosition = (item) => {
        console.log("DATA", item.countryInfo)
        const LATLNG = {
            latitude: parseFloat(item.countryInfo.lat),
            longitude: parseFloat(item.countryInfo.long)
        };

        // return (
        //     <Marker coordinate={assetLocations}
        //         image={require('../assets/images/pin.png')}
        //     />
        // )
        if (parseInt(item.cases) > 20000 || parseInt(item.cases) == 20000) {
            return (
                <MapView.Circle
                    center={LATLNG}
                    radius={100000}
                    stokeWidth={0.4}
                    strokeColor={'white'}
                    fillColor={'rgba(245, 19, 7,0.5)'}
                />
            )
        } else
            if ((parseInt(item.cases) > 100000 && parseInt(item.cases) < 1000000) || parseInt(item.cases) == 1000000) {
                return (
                    <MapView.Circle
                        center={LATLNG}
                        radius={260000}
                        stokeWidth={0.4}
                        strokeColor={'white'}
                        fillColor={'rgba(245, 19, 7,0.5)'}
                    />
                )
            } else
                if ((parseInt(item.cases) > 50000 && parseInt(item.cases) < 100000) || parseInt(item.cases) == 100000) {
                    return (
                        <MapView.Circle
                            center={LATLNG}
                            radius={200000}
                            stokeWidth={0.4}
                            strokeColor={'white'}
                            fillColor={'rgba(245, 19, 7,0.5)'}
                        />
                    )
                } else
                    if ((parseInt(item.cases) > 20000 && parseInt(item.cases) < 50000) || parseInt(item.cases) == 50000) {
                        return (
                            <MapView.Circle
                                center={LATLNG}
                                radius={150000}
                                stokeWidth={0.4}
                                strokeColor={'white'}
                                fillColor={'rgba(245, 19, 7,0.5)'}
                            />
                        )
                    } else
                        if (parseInt(item.cases) < 20000 || parseInt(item.cases) == 20000) {
                            return (
                                <MapView.Circle
                                    center={LATLNG}
                                    radius={100000}
                                    stokeWidth={0.4}
                                    strokeColor={'white'}
                                    fillColor={'rgba(245, 19, 7,0.4)'}
                                />
                            )
                        } else
                            if (parseInt(item.cases) < 10000 && parseInt(item.cases) > 5000) {
                                return (
                                    <MapView.Circle
                                        center={LATLNG}
                                        radius={60000}
                                        stokeWidth={0.4}
                                        strokeColor={'white'}
                                        fillColor={'rgba(245, 19, 7,0.3)'}
                                    />
                                )
                            } else
                                if (parseInt(item.cases) == 5000 || parseInt(item.cases) < 5000) {
                                    return (
                                        <MapView.Circle
                                            center={LATLNG}
                                            radius={40000}
                                            stokeWidth={0}
                                            strokeColor={'white'}
                                            fillColor={'rgba(245, 19, 7,0.2)'}
                                        />
                                    )
                                }
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={"ios-arrow-back"} size={40} color={'white'} />
                </TouchableOpacity>
                <MapView
                    //provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                    // provider={PROVIDER_GOOGLE}
                    // mapType={'hybrid'}
                    customMapStyle={mapStyle}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    zoomControlEnabled={true}
                    onRegionChange={this.onRegionChange}
                    // minZoomLevel={3}
                    initialRegion={INITIAL_REGION}
                    style={styles.map}>
                    {this.state.country.map(item => (
                        this.setMarkerPosition(item)
                    ))}
                </MapView>

            </SafeAreaView>
        )
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