import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Geojson, Circle } from 'react-native-maps';
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
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
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
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
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
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
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
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
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
            country: [{
                lat: 22.303894,
                long: 70.802162,
                cases: 50000
            },
            {
                lat: 23.0201815,
                long: 72.4393129,
                cases: 9000
            },
            {
                lat: 23.7083451,
                long: 68.7987823,
                cases: 4000
            },
            {
                lat: 20.72061,
                long: 70.9103814,
                cases: 10000
            },
            {
                lat: 22.3220875,
                long: 73.1028741,
                cases: 500
            },
            {
                lat: 21.1591857,
                long: 72.752084,
                cases: 22000
            },
            {
                lat: 19.0821976,
                long: 72.7407561,
                cases: 12000
            },
            {
                lat: 15.3470372,
                long: 73.731424,
                cases: 4000
            },
            {
                lat: 28.6466758,
                long: 76.8123845,
                cases: 7000
            },

            ],
            region: {
                latitude: 20.0069598,
                longitude: 64.3980887,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },

            currentLongitude: 22.2818476,
            currentLongitude: 70.7510417,
            LATLNG: {
                latitude: 22.303894,
                longitude: 70.802162
            },
        }
    }

    setMarkerPosition = (item) => {
        const LATLNG = {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long),
        };

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
            if (parseInt(item.cases) < 20000 || parseInt(item.cases) == 20000) {
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
                    <Ionicons name={"ios-arrow-back"} size={40} color={'black'} />
                </TouchableOpacity>
                <MapView
                    //provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                    provider={PROVIDER_GOOGLE}
                    isAccessibilityElement={true}
                    customMapStyle={mapStyle}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    zoomControlEnabled={true}
                    onRegionChange={this.onRegionChange}
                    region={this.state.region}
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

const myPlace = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [64.165329, 48.844287],
            }
        }
    ]
};
