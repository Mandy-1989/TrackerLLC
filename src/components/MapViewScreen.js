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
        this.props.fetchCovidCountry_19List()
    }

    render() {
        switch (this.props.covidInfo.isFetching) {
            case true:
                return <View style={styles.viewParent}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                console.log("Response:" + JSON.stringify(this.props.covidInfo.covidCountry))
                if (this.props.covidInfo.hasOwnProperty('data')) {
                    this.setState({
                        country: this.props.covidInfo.covidCountry.data.country
                    })
                    console.log("Length:" + this.state.country.length)
                }

                return (
                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                        // region={{
                        //     latitude: 37.78825,
                        //     longitude: -122.4324,
                        //     latitudeDelta: 0.015,
                        //     longitudeDelta: 0.0121,
                        // }}
                        >

                            {this.state.country.map(marker => (
                                <Marker
                                    coordinate={marker.lat + "," + marker.long}
                                    title={marker.name}
                                    description={marker.state}
                                />
                            ))}

                        </MapView>
                    </View>
                )
        }
    }
}

function mapStateToProps(state) {
    return {
        covidInfo: state.covidCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovidCountry_19List }, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // height: 400,
        // width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)