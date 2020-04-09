
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
import { DATE, label } from './Moment'
import { Graph1 } from './TabGraph';

let covidName;
let usacountry;
const window = Dimensions.get('window')

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
            countryName: '',
            data2: [null, label.ten, label.nine, label.eightth, label.seventh, label.sixth, label.fifth, label.fourth, label.third, label.second, label.first, null],
            cases: '',
            recovered: '',
            deaths: '',
            disabled: false
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
                this.setState({ selectedData: this.props.usaStateList, searchData: this.props.usaStateList, countryName: this.props.usaStateList[0].displayName, index: 0, disabled: true })
                :
                this.setState({ selectedData: this.props.countryList, searchData: this.props.countryList, countryName: this.props.countryList[0].country })
        }
        usacountry ?
            this.countryGraph(this.props.usaStateList[0])
            :
            this.countryGraph(this.props.countryList[0])
    }

    renderCountryItem = ({ item, index }) => {
        let count = covidName === 'CONFIRMED CASES' ? JSON.stringify(item.cases) : (covidName === 'RECOVERED CASES' ? JSON.stringify(item.recovered) : JSON.stringify(item.deaths))
        let countState = JSON.stringify(item.totalConfirmed)

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
                                <Text style={[styles.textStyleTwo, { flex: 1 }]}>{item.displayName}</Text>
                                <View>
                                    <Text style={[styles.textStyle, { flex: 1, color: colors.color_2, alignItems: 'flex-end' }]}>{countState}</Text>
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
            countryName: item.country,
            cases: item.cases,
            recovered: item.recovered,
            deaths: item.deaths
        })

        usacountry ?
            this.setState({
                countryName: item.displayName,
                cases: item.totalConfirmed,
                recovered: item.totalRecovered,
                deaths: item.totalDeaths
            })
            :
            fetch('https://corona.lmao.ninja/v2/historical/' + item.country, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    var response = responseJson.timeline;
                    covidName === 'CONFIRMED CASES' ?
                        this.setState({
                            data: [0, response.cases[DATE.ten], response.cases[DATE.nine], response.cases[DATE.eightth], response.cases[DATE.seventh], response.cases[DATE.sixth], response.cases[DATE.fifth], response.cases[DATE.fourth], response.cases[DATE.third], response.cases[DATE.second], response.cases[DATE.first], 0],
                        })
                        : (covidName === 'RECOVERED CASES' ?
                            this.setState({
                                data: [0, response.recovered[DATE.ten], response.recovered[DATE.nine], response.recovered[DATE.eightth], response.recovered[DATE.seventh], response.recovered[DATE.sixth], response.recovered[DATE.fifth], response.recovered[DATE.fourth], response.recovered[DATE.third], response.recovered[DATE.second], response.recovered[DATE.first], 0],
                            })
                            :
                            this.setState({
                                data: [0, response.deaths[DATE.ten], response.deaths[DATE.nine], response.deaths[DATE.eightth], response.deaths[DATE.seventh], response.deaths[DATE.sixth], response.deaths[DATE.fifth], response.deaths[DATE.fourth], response.deaths[DATE.third], response.deaths[DATE.second], response.deaths[DATE.first], 0],
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
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ height: window.height / 2 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity style={{ padding: 10, maringTop: StyleConfig.countPixelRatio(20) }} onPress={() => this.props.navigation.goBack()}>
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

                    <View style={{ height: window.height / 2, backgroundColor: 'white', }}>

                        <Text style={styles.countryName}>{this.state.countryName}</Text>
                        {usacountry ?
                            <View style={{ height: 220, marginTop: 10 }}>
                                {this.state.index == 0 &&
                                    <Graph1
                                        cases={this.state.cases}
                                        recovered={this.state.recovered}
                                        deaths={this.state.deaths}
                                    />
                                }
                            </View>
                            :
                            <View style={{ height: 220, marginTop: 10 }}>
                                {this.state.index == 0 &&
                                    <Graph
                                        data={this.state.data}
                                        formatLabel={(value, index) => this.state.data2[index]}
                                    />
                                }
                                {this.state.index == 1 &&
                                    <Graph1
                                        cases={this.state.cases}
                                        recovered={this.state.recovered}
                                        deaths={this.state.deaths}
                                    />
                                }
                            </View>
                        }
                        <View style={styles.greyLine}></View>
                        <ButtonGroup
                            disabled={this.state.disabled}
                            innerBorderStyle={{ width: 20, color: 'white' }}
                            onPress={this.updateIndex}
                            selectedIndex={this.state.index}
                            buttons={usacountry ? ['Total Cases'] : ['Daily Increase', 'Total Cases']}
                            textStyle={styles.textStyle}
                            containerStyle={styles.containerStyle}
                            selectedButtonStyle={{ backgroundColor: Colors.color_9, height: 25, width: 85, }}
                            selectedTextStyle={{ color: 'black', fontSize: 11 }}
                        />
                    </View>

                </View>
            </SafeAreaView>
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
    graphText: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 100,

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
        paddingLeft: 2,
        borderColor: 'white',
        top: -5
    },
    countryName: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
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

