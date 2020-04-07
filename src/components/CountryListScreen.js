
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, SafeAreaView, ListView } from 'react-native';
import { fetchCountryList } from '../redux/actions/CountryList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/Colors';
import BarGraph from './BarGraph';
import { ButtonGroup } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Graph } from './Graph';
var moment = require('moment')

let covidName;
let usacountry;
const window = Dimensions.get('window')
var first = moment().subtract(1, 'days').format("M/D/YY");
var second = moment().subtract(2, 'days').format("M/D/YY");
var third = moment().subtract(3, 'days').format("M/D/YY");
var fourth = moment().subtract(4, 'days').format("M/D/YY");
var fifth = moment().subtract(5, 'days').format("M/D/YY");

class CountryListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchData: '',
            selectedData: [],
            searchData: [],
            List: [],
            index: 0,
            data: [],
            data2: [],
            date: new Date(),
            countryName: 'No country Selected',
            data2: [null, fifth, fourth, third, second, first, null,]
        }
        covidName = this.props.navigation.getParam('name')
        usacountry = this.props.navigation.getParam('item')
    }

    updateIndex = (index) => {
        this.setState({ index })
    }

    async componentDidMount() {
        {
            usacountry ?
                this.setState({ selectedData: this.props.usaStateList, searchData: this.props.usaStateList })
                :
                this.setState({ selectedData: this.props.countryList, searchData: this.props.countryList })
        }

    }

    renderCountryItem = ({ item, index }) => {
        let count = covidName === 'CONFIRMED CASES' ? JSON.stringify(item.cases) : (covidName === 'RECOVERED CASES' ? JSON.stringify(item.recovered) : JSON.stringify(item.deaths))
        let countState = JSON.stringify(item.cases)
        return (
            <TouchableOpacity onPress={() => { this.countryGraph(item, index) }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.color_9, colors.color_10]} style={styles.flatlistView}>

                    {!usacountry ?
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item.countryInfo.flag }} style={styles.imageStyle} />
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginHorizontal: 10 }}>
                                <Text style={styles.textStyleTwo}>{item.country}</Text>
                                <Text style={[styles.textStyle, { color: colors.color_2 }]}>{count.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 20 }}>
                                <Text style={[styles.textStyleTwo, { flex: 1 }]}>{item.state}</Text>
                                <View>
                                    <Text style={[styles.textStyle, { flex: 1, color: colors.color_2, alignItems: 'flex-end' }]}>{countState.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    async  countryGraph(item, index) {
        this.setState({
            countryName: item.country
        })
        usacountry ?
            fetch('https://corona.lmao.ninja/states', {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    responseJson.map((item) => {
                        console.log("Response", item.cases)
                        this.setState({
                            data: [item.cases]
                        })
                    })
                }
                )
            :
            fetch('https://corona.lmao.ninja/v2/historical/' + item.country, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    covidName === 'CONFIRMED CASES' ?
                        this.setState({
                            data: [0, responseJson.timeline.cases[fifth], responseJson.timeline.cases[fourth], responseJson.timeline.cases[third], responseJson.timeline.cases[second], responseJson.timeline.cases[first], 0],
                        })
                        : (covidName === 'RECOVERED CASES' ?
                            this.setState({
                                data: [0, responseJson.timeline.recovered[fifth], responseJson.timeline.recovered[fourth], responseJson.timeline.recovered[third], responseJson.timeline.recovered[second], responseJson.timeline.recovered[first], 0],
                            })
                            :
                            this.setState({
                                data: [0, responseJson.timeline.deaths[fifth], responseJson.timeline.deaths[fourth], responseJson.timeline.deaths[third], responseJson.timeline.deaths[second], responseJson.timeline.deaths[first], 0],
                            })
                        )
                })



    }

    renderSeparator = () => (
        <View style={{
            backgroundColor: StyleConfig.COLOR.GREY_DIM,
            height: 0.6
        }} />
    );

    _onSearch = (searchValue) => {
        const { searchData, selectedData } = this.state
        if (searchData !== null && searchData !== undefined && searchData !== []) {
            let data = searchData.filter(function (item) {
                let type = item.country ? item.country : item.state;
                return (type.trim().toLowerCase().startsWith(searchValue.trim().toLowerCase()))
            });

            this.setState({ selectedData: data })
        }
    };

    render() {
        const { selectedData } = this.state
        const { countryList } = this.props
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
                    <SafeAreaView>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ height: window.height / 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.props.navigation.goBack()}>
                                        <Ionicons name={"ios-arrow-back"} size={25} color={'black'} />
                                    </TouchableOpacity>

                                    <Ionicons style={{ marginLeft: 10 }}
                                        name={'ios-search'}
                                        color={colors.grey}
                                        size={18} />

                                    <TextInput
                                        placeholder={'Search'}
                                        style={styles.textInput}
                                        onChangeText={(text) => this._onSearch(text)}
                                    />
                                </View>

                                <FlatList
                                    keyExtractor={(item, index) => item.country}
                                    data={selectedData.length !== 0 ? selectedData : null}
                                    renderItem={(index) => this.renderCountryItem(index)}
                                    ItemSeparatorComponent={this.renderSeparator}
                                />
                            </View>
                            {usacountry ? null :
                                <View style={{ height: window.height / 2, }}>

                                    <Text style={styles.countryName}>{this.state.countryName}</Text>

                                    <View style={{ height: 220 }}>
                                        <Graph
                                            data={this.state.data}
                                            formatLabel={(value, index) => this.state.data2[index]}
                                        />
                                    </View>
                                    <View style={styles.greyLine}></View>
                                    <ButtonGroup
                                        innerBorderStyle={{ width: 20, color: 'white' }}
                                        onPress={this.updateIndex}
                                        selectedIndex={this.state.index}
                                        buttons={['Daily Increase', 'Total Cases']}
                                        textStyle={styles.textStyle}
                                        containerStyle={styles.containerStyle}
                                        selectedButtonStyle={{ backgroundColor: Colors.color_9, height: 25, width: 85, }}
                                        selectedTextStyle={{ color: 'black', fontSize: 11 }}
                                    />
                                </View>

                            }
                        </View>
                    </SafeAreaView>
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
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontFamily: 'FiraSans-Bold'
    },
    textStyleTwo: {
        fontSize: 16,
        fontFamily: 'FiraSans-Bold'
    },
    imageStyle: {
        backgroundColor: StyleConfig.COLOR.GREY_DIM,
        height: 40,
        width: 40,
        borderWidth: 0.1,
        marginHorizontal: StyleConfig.countPixelRatio(10),
        marginVertical: StyleConfig.countPixelRatio(10),
        borderRadius: 40 / 2,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontFamily: 'FiraSans-Regular',
        fontSize: 18
    },
    greyLine: {
        marginTop: 7,
        width: Dimensions.get('window').width - 30,
        alignSelf: 'center',
        height: 1,
        backgroundColor: 'grey'
    },
    textStyle: {
        color: 'darkgrey',
        fontSize: 11,
        borderWidth: 0.7,
        borderColor: 'black',
        height: 25,
        width: 85,
        textAlign: 'center',
        backgroundColor: Colors.color_9,
        paddingTop: 5
    },
    containerStyle: {
        height: 25,
        width: 200,
        marginLeft: 15,
        borderWidth: 0,
        borderColor: 'white',
        top: -5
    },
    countryName: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 15,
        color: 'black',
        alignSelf: 'center'
    }

})

function mapStateToProps(state) {
    const { isFetching, countryList } = state.countryList;
    const { usaStateList } = state.usaStateList;

    return {
        isFetching, countryList, usaStateList
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         ...bindActionCreators({ fetchUsaStateData }, dispatch)
//     }
// }

export default connect(mapStateToProps)(CountryListScreen)

