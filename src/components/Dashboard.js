import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCovid_19List } from '../redux/actions/CovidInfo';

class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchCovid_19List()
    }

    render() {
        switch (this.props.covidInfo.isFetching) {
            case true:
                return <View style={styles.viewParent}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                console.log("Response:" + JSON.stringify(this.props.covidInfo))
                return (
                    <View style={styles.viewParent}>
                        <Text>Dashboard</Text>
                    </View>
                )
        }
    }
}

function mapStateToProps(state) {
    return {
        covidInfo: state.covid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovid_19List }, dispatch)
    }
}

const styles = StyleSheet.create({
    viewParent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3D3'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)