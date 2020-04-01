import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'

var mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
]

export default class Map extends Component {

    constructor(props) {
        super(props)

        this.state = {
            country: []
        }
    }

    // componentDidMount() {
    //     this.props.fetchCovidCountry_19List(1);
    // }

    setMarkerPosition = (item) => {
        const assetLocations = {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long)
        };

        // return (
        //     <Marker coordinate={assetLocations}
        //         image={require('../assets/images/pin.png')}
        //     />
        // )
    }

    render() {
        // const item = this.props.navigation.getParams('item')
        // const { covidInfo, isLoading } = this.props;
        // switch (isLoading) {
        //     case true:
        //         return <View style={styles.viewParent}>
        //             <ActivityIndicator size={'large'} />
        //         </View>
        //     case false:
        //         if (covidInfo.length > 0) {
        //             if (this.state.country.length == 0) {
        //                 this.setState({
        //                     country: covidInfo
        //                 })
        //             }
        //         }



        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backIconContainer} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={"ios-arrow-back"} size={40} color={'black'} />
                </TouchableOpacity>
                <MapView
                    //provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                    provider={PROVIDER_GOOGLE}
                    // mapType={Platform.OS === 'android' ? 'terrain' : 'standard'}
                    customMapStyle={mapStyle}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    zoomControlEnabled={true}
                    onRegionChange={this.onRegionChange}
                    // minZoomLevel={3}
                    style={styles.map}>
                    {this.state.country.map(item => (
                        this.setMarkerPosition(item)
                    ))}
                </MapView>
                {/* <MapView provider={PROVIDER_GOOGLE}
                            
                        /> */}

            </SafeAreaView>
        )
    }
}


// function mapStateToProps(state) {
//     return {
//         covidInfo: state.covidCountry.covidCountry,
//         isLoading: state.covidCountry.isFetching,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         ...bindActionCreators({ fetchCovidCountry_19List }, dispatch)
//     }
// }

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

// export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)