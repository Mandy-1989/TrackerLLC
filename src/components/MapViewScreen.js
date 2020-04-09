import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchCountryList } from '../redux/actions/CountryList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import { mapStyle } from '../constants/MapStyle'
import MapViewCluster from 'react-native-map-clustering'

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
            region:{
                latitude: 23.0497,
                longitude: 72.5117,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

   async componentDidMount() {
        this.props.fetchCountryList();

     await  navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log({po})
                const lat = position.coords.latitude; //42.300170;
                const long = position.coords.longitude; //-71.375310;
                await this.setState({
                    region: {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                });

                // await this.getLocationData(lat, long);
                // this.forceUpdate()
            },
            (error) => Alert.alert(error.message),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    setMarkerPosition = (item) => {
        const assetLocations = {
            latitude: parseFloat(item.countryInfo.lat),
            longitude: parseFloat(item.countryInfo.long)
        };

        return (
            // <Marker
            //  coordinate={assetLocations}
            //     image={require('../assets/images/pin.png')}
            <MapView.Circle
                center={assetLocations}
                radius={100000}
                stokeWidth={0.4}
                strokeColor={'white'}
                fillColor={'rgba(245, 19, 7,0.4)'}
            />
        )
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
                            country: this.props.countryList
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
    const { isFetching, countryList } = state.countryList;
    return {
        isFetching, countryList
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
