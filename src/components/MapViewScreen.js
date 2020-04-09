import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchCountryList } from '../redux/actions/CountryList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import { mapStyle } from '../constants/MapStyle'

// const INITIAL_REGION = {
//     latitude: 52.5,
//     longitude: 19.2,
//     latitudeDelta: 8.5,
//     longitudeDelta: 8.5
// };
class MapViewScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            country: [],
            usa: [],
            region: {
                latitude: 23.0497,
                longitude: 72.5117,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }


    async componentDidMount() {
        this.props.fetchCountryList();
        await fetch('https://corona.lmao.ninja/countries', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    country: responseJson,
                    usa: this.props.usaStateList
                })
            }
            )
    }

    setMarkerPosition = (item, index) => {
        var lat = item.countryInfo.lat
        var long = item.countryInfo.long
        const LATLNG = {
            latitude: parseFloat(lat),
            longitude: parseFloat(long)
        };
        if ((parseInt(item.cases) > 1000000 && parseInt(item.cases) < 10000000) || parseInt(item.cases) == 10000000) {
            return (
                <MapView.Circle
                    center={LATLNG}
                    radius={3000000}
                    stokeWidth={0.4}
                    strokeColor={'white'}
                    fillColor={'rgba(245, 19, 7,0.7)'}
                />
            )
        } else
            if ((parseInt(item.cases) > 300000 && parseInt(item.cases) < 1000000) || parseInt(item.cases) == 1000000) {
                return (
                    <MapView.Circle
                        center={LATLNG}
                        radius={1000000}
                        stokeWidth={0.4}
                        strokeColor={'white'}
                        fillColor={'rgba(245, 19, 7,0.5)'}
                    />
                )
            } else
                if ((parseInt(item.cases) > 100000 && parseInt(item.cases) < 300000) || parseInt(item.cases) == 300000) {
                    return (
                        <MapView.Circle
                            center={LATLNG}
                            radius={750000}
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
                                radius={400000}
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
                                    radius={300000}
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
                                        radius={200000}
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
                                            radius={100000}
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
                                                radius={50000}
                                                stokeWidth={0}
                                                strokeColor={'white'}
                                                fillColor={'rgba(245, 19, 7,0.2)'}
                                            />
                                        )
                                    }

    }

    setMarkerPosition1 = (item, index) => {
        var lat = item.lat
        var long = item.long
        const LATLNG = {
            latitude: parseFloat(lat),
            longitude: parseFloat(long)
        };
        if ((parseInt(item.totalConfirmed) > 300000 && parseInt(item.totalConfirmed) < 1000000) || parseInt(item.totalConfirmed) == 1000000) {
            return (
                <MapView.Circle
                    center={LATLNG}
                    radius={120000}
                    stokeWidth={0.4}
                    strokeColor={'white'}
                    fillColor={'rgba(245, 19, 7,0.5)'}
                />
            )
        } else
            if ((parseInt(item.totalConfirmed) > 100000 && parseInt(item.totalConfirmed) < 300000) || parseInt(item.totalConfirmed) == 300000) {
                return (
                    <MapView.Circle
                        center={LATLNG}
                        radius={640000}
                        stokeWidth={0.4}
                        strokeColor={'white'}
                        fillColor={'rgba(245, 19, 7,0.5)'}
                    />
                )
            } else
                if ((parseInt(item.totalConfirmed) > 50000 && parseInt(item.totalConfirmed) < 100000) || parseInt(item.totalConfirmed) == 100000) {
                    return (
                        <MapView.Circle
                            center={LATLNG}
                            radius={320000}
                            stokeWidth={0.4}
                            strokeColor={'white'}
                            fillColor={'rgba(245, 19, 7,0.5)'}
                        />
                    )
                } else
                    if ((parseInt(item.totalConfirmed) > 20000 && parseInt(item.totalConfirmed) < 50000) || parseInt(item.totalConfirmed) == 50000) {
                        return (
                            <MapView.Circle
                                center={LATLNG}
                                radius={160000}
                                stokeWidth={0.4}
                                strokeColor={'white'}
                                fillColor={'rgba(245, 19, 7,0.5)'}
                            />
                        )
                    } else
                        if (parseInt(item.totalConfirmed) < 20000 || parseInt(item.totalConfirmed) == 20000) {
                            return (
                                <MapView.Circle
                                    center={LATLNG}
                                    radius={80000}
                                    stokeWidth={0.4}
                                    strokeColor={'white'}
                                    fillColor={'rgba(245, 19, 7,0.4)'}
                                />
                            )
                        } else
                            if (parseInt(item.totalConfirmed) < 10000 && parseInt(item.totalConfirmed) > 5000) {
                                return (
                                    <MapView.Circle
                                        center={LATLNG}
                                        radius={40000}
                                        stokeWidth={0.4}
                                        strokeColor={'white'}
                                        fillColor={'rgba(245, 19, 7,0.3)'}
                                    />
                                )
                            } else
                                if (parseInt(item.totalConfirmed) == 5000 || parseInt(item.totalConfirmed) < 5000) {
                                    return (
                                        <MapView.Circle
                                            center={LATLNG}
                                            radius={20000}
                                            stokeWidth={0}
                                            strokeColor={'white'}
                                            fillColor={'rgba(245, 19, 7,0.2)'}
                                        />
                                    )
                                }

    }

    render() {
        switch (this.props.isFetching) {
            case true:
                return <View style={styles.viewParent}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                if (this.props.countryList.length > 0) {
                    if (this.state.country.length == 0) {
                        this.setState({
                            country: this.props.countryList,
                        })
                    }
                }

                return (
                    <SafeAreaView style={styles.container}>
                        <TouchableOpacity style={styles.backIconContainer} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={"ios-arrow-back"} size={26} color={'white'} />
                        </TouchableOpacity>
                        <MapView provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                            // mapType={Platform.OS === 'android' ? 'terrain' : 'standard'}
                            zoomEnabled={true}
                            zoomTapEnabled={true}
                            zoomControlEnabled={true}
                            isAccessibilityElement={true}
                            customMapStyle={mapStyle}
                            initialRegion={this.state.region}
                            onRegionChange={this.onRegionChange}
                            style={styles.map}>
                            {this.state.country.map((item, index) => (
                                this.setMarkerPosition(item, index)
                            ))}
                            {this.state.usa.map((item) => (
                                this.setMarkerPosition1(item)
                            ))}
                        </MapView>
                    </SafeAreaView>
                )
        }
    }
}

function mapStateToProps(state) {
    const { isFetching, countryList } = state.countryList;
    const { usaStateList } = state.usaStateList
    return {
        isFetching, countryList, usaStateList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCountryList }, dispatch)
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
