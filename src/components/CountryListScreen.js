
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, SafeAreaView } from 'react-native';
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

let covidName;

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
        }
        covidName = this.props.navigation.getParam('name')
    }

    updateIndex = (index) => {
        this.setState({ index })
    }

    async componentDidMount() {
        this.props.fetchCountryList();
        this.setState({ selectedData: this.props.countryList, searchData: this.props.countryList })

        await fetch('https://corona.lmao.ninja/v2/historical', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // const response = responseJson[index].country == item.country;
                // this.setState({
                //     List: responseJson,
                // })
            })
    }

    renderCountryItem = ({ item, index }) => {
        let count = covidName === 'CONFIRMED CASES' ? JSON.stringify(item.cases) : (covidName === 'RECOVERED CASES' ? JSON.stringify(item.recovered) : JSON.stringify(item.deaths))
        return (
            <TouchableOpacity onPress={() => { this.countryGraph(item, index) }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.color_9, colors.color_10]} style={styles.flatlistView}>

                    <Image source={{ uri: item.countryInfo.flag }} style={styles.imageStyle} />
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={styles.textStyleTwo}>{item.country}</Text>
                        <Text style={[styles.textStyle, { color: colors.color_2 }]}>{count.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    async  countryGraph(item, index) {
        const countryCode = item.country
        await fetch('https://corona.lmao.ninja/v2/historical/' + countryCode, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // const response = responseJson[index].country == item.country;
                console.log("ResponceJson", responseJson)
                // this.setState({
                //     data: responseJson.timeline.cases
                // })

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
                let type = item.country;
                return (type.trim().toLowerCase().startsWith(searchValue.trim().toLowerCase()))
            });

            this.setState({ selectedData: data })
        }
    };



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
                                    data={this.state.selectedData}
                                    renderItem={(index) => this.renderCountryItem(index)}
                                    ItemSeparatorComponent={this.renderSeparator}
                                />
                            </View>
                            <View style={{ height: window.height / 2 }}>
                                <Graph />
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
        textAlignVertical: 'center',
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

