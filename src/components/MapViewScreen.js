import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
                    <View style={styles.container}>
                        <MapView provider={PROVIDER_GOOGLE}
                            mapType={'terrain'}
                            zoomEnabled={true}
                            zoomTapEnabled={true}
                            zoomControlEnabled={true}
                            minZoomLevel={3}
                            style={styles.map}>
                            {this.state.country.map(item => (
                                this.setMarkerPosition(item)
                            ))}
                        </MapView>
                    </View>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)