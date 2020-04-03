
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import AppImages from '../assets/images';
import { fetchCountryList } from '../redux/actions/CountryList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/Colors';

let covidName;
let total;
let searchDataItem = [];
class CountryListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchData: '',
            selectedData: []
        }
        covidName = this.props.navigation.getParam('name')
        total = this.props.navigation.getParam('total')
    }

    componentDidMount() {
        this.props.fetchCountryList();
    }
    renderCountryItem = ({ item, index }) => {
        let count = covidName === 'CONFIRMED CASES' ? JSON.stringify(item.cases) : (covidName === 'RECOVERED CASES' ? JSON.stringify(item.recovered) : JSON.stringify(item.deaths))
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.color_9, colors.color_10]} style={styles.flatlistView}>
                <View>
                    <Image source={{ uri: item.countryInfo.flag }} style={styles.imageStyle} />
                </View>
                <Text style={styles.textStyleTwo}>{item.country}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end', margin: 15 }}>
                    <Text style={[styles.textStyle, { color: colors.color_2 }]}>{count.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
            </LinearGradient>
        )
    }

    renderSeparator = () => (
        <View style={{
            backgroundColor: StyleConfig.COLOR.GREY_DIM,
            height: 0.6
        }} />
    );
    render() {
        switch (this.props.isFetching) {
            case true:
                return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                if (this.props.countryList.length > 0) {
                    this.props.countryList.sort(function (obj1, obj2) {
                        return covidName === 'CONFIRMED CASES' ? obj2.cases - obj1.cases : (covidName === 'RECOVERED CASES' ? obj2.recovered - obj1.recovered : obj2.deaths - obj1.deaths)
                    });
                }

                return (
                    <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
                        <TouchableOpacity style={{ padding: 10, marginTop: StyleConfig.countPixelRatio(30) }} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={"ios-arrow-back"} size={25} color={'black'} />
                        </TouchableOpacity>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: StyleConfig.countPixelRatio(10) }}>
                            <Text style={{ fontSize: 28, fontFamily: 'FiraSans-Medium' }}> {covidName === 'CONFIRMED CASES' ? 'Total Confirmed:' : (covidName === 'RECOVERED CASES' ? 'Total Recovered:' : 'Total Deaths:')}</Text>
                            <Text style={{ fontSize: 40, color: 'red', fontFamily: 'FiraSans-Bold' }}>{total}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: StyleConfig.countPixelRatio(20) }} >
                            <Ionicons name={'ios-search'} size={22} />
                            <TextInput
                                placeholder={'Search'}
                                style={styles.textInput}
                                onChangeText={(text) => this._onSearch(text)}
                            />
                        </View>

                        <View style={{ marginBottom: 50 }}>
                            <FlatList
                                keyExtractor={(item, index) => item.country}
                                data={this.props.countryList}
                                renderItem={(index) => this.renderCountryItem(index)}
                                ItemSeparatorComponent={this.renderSeparator}

                            />
                        </View>
                    </View>
                )
        }
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
    imageStyle: {
        backgroundColor: StyleConfig.COLOR.GREY_DIM,
        height: 60,
        width: 60,
        borderWidth: 0.1,
        marginHorizontal: StyleConfig.countPixelRatio(20),
        marginVertical: StyleConfig.countPixelRatio(10),
        borderRadius: 60 / 2,
        alignItems: 'center',
    },
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 20
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(CountryListScreen)

