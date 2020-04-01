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
        let count = covidName === 'CONFIRMED CASES' ? JSON.stringify(item.cases) : (covidName === 'RECOVERED CASES' ? JSON.stringify(item.recovered) : JSON.stringify(item.deaths))        
        return (
            <View style={styles.flatlistView}>                
                    <View>
                        <Image source={{uri:item.countryInfo.flag}}  style={styles.imageStyle} />
                    </View>
                    <View>
                        <Text style={styles.textStyleTwo}>{item.country}</Text>
                        <Text style={[styles.textStyle, { color: StyleConfig.COLOR.GREY_DIM}]}>{count.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>                   
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
        this.props.covidInfo.sort(function (obj1, obj2) {
            return  covidName === 'CONFIRMED CASES' ? obj2.cases - obj1.cases : (covidName === 'RECOVERED CASES' ? obj2.recovered - obj1.recovered : obj2.deaths - obj1.deaths)
        });

        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
                <TouchableOpacity style={{ padding: 10, marginTop: StyleConfig.countPixelRatio(30) }} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={"ios-arrow-back"} size={25} color={'black'} />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: StyleConfig.countPixelRatio(10) }}>
                    <Text style={{ fontSize: 28, fontFamily: 'FiraSans-Medium' }}> {covidName === 'CONFIRMED CASES' ? 'Total Confirmed:' : (covidName === 'RECOVERED CASES' ? 'Total Recovered:' : 'Total Deaths:')}</Text>
                    <Text style={{ fontSize: 40, color: 'red', fontFamily: 'FiraSans-Bold' }}>{total}</Text>
                </View>

                {!isLoading ?
                    <View style={{ marginBottom: 50 }}>
                        <FlatList
                            keyExtractor={(item, index) => item.country}
                            data={data && data.length !== 0 && data !== undefined ? data : null}
                            renderItem={(index) => this.renderCountryItem(index)}
                            // ItemSeparatorComponent={this.renderSeparator}
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
        // justifyContent:'center',
        marginHorizontal: StyleConfig.countPixelRatio(1)
    },
    textStyle: {
        fontSize: 22,
        width: 80,
        textAlign: 'justify',
        fontFamily: 'FiraSans-Medium'
    },
    textStyleTwo: {
        fontSize: 20,
        paddingVertical: 4,
        fontFamily: 'FiraSans-Medium'
    },
    imageStyle:{
        backgroundColor:StyleConfig.COLOR.GREY_DIM, 
        height:60,
        width:60,
        borderWidth:0.1,
        marginHorizontal:StyleConfig.countPixelRatio(20),
        marginVertical:StyleConfig.countPixelRatio(10),
        borderRadius:60/2,
        alignItems:'center'
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