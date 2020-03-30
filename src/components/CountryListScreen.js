import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import AppImages from '../assets/images';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'

let covidName;
let total;

class CountryListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }

        covidName = this.props.navigation.getParam('name')
        total = this.props.navigation.getParam('total')
    }

    componentDidMount() {
        this.props.fetchCovidCountry_19List(2);
    }
    renderCountryItem = ({ item, index }) => {
        let count = covidName === 'CONFIRMED CASES' ? item.confirmed : (covidName === 'RECOVERED CASES' ? item.recovered : item.deaths)

        return (
            <View style={styles.flatlistView}>
                <Text style={[styles.textStyle, { color: 'red' }]}>{count}</Text>
                <Text style={styles.textStyleTwo}>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () => (
        <View style={{
            backgroundColor: "#C4C4C4",
            height: 0.5
        }} />
    );

    render() {
        let data;
        const { covidInfo, isLoading } = this.props;

        if (this.props.covidInfo !== undefined && this.props.covidInfo !== undefined && this.props.covidInfo !== undefined) {
            data = covidInfo;
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
                <TouchableOpacity style={{ padding: 10,marginTop:StyleConfig.countPixelRatio(30) }} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={"ios-arrow-back"} size={25} color={'black'} />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center',marginBottom:StyleConfig.countPixelRatio(10) }}>
                    <Text style={{ fontSize: 28, fontFamily: 'FiraSans-Medium' }}> {covidName === 'CONFIRMED CASES' ? 'Total Confirmed:' : (covidName === 'RECOVERED CASES' ? 'Total Recovered:' : 'Total Deaths:')}</Text>
                    <Text style={{ fontSize: 40, color: 'red', fontFamily: 'FiraSans-Bold' }}>{total}</Text>
                </View>

                {!isLoading ?
                    <View style={{ marginBottom: 50 }}>
                        <FlatList
                            keyExtractor={(item, index) => item.name}
                            data={data && data.length !== 0 && data !== undefined ? data : null}
                            renderItem={(index) => this.renderCountryItem(index)}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </View>
                    : null
                    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    //     <ActivityIndicator size={'large'} />
                    // </View>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewParent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffff'
    },
    flatlistView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: StyleConfig.countPixelRatio(15)
    },
    textStyle: {
        fontSize: 20,
        width: 80,
        textAlign: 'justify',
        fontFamily: 'FiraSans-Medium'
    },
    textStyleTwo: {
        fontSize: 18,
        paddingVertical: 5,
        fontFamily: 'FiraSans-Medium'
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(CountryListScreen)