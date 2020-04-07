
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleConfig from '../assets/StyleConfig'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/Colors';
import BarGraph from './BarGraph';

let covidName;
let usacountry;
const window = Dimensions.get('window')

class CountryListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchData: '',
            selectedData: [],
            searchData: []
        }
        covidName = this.props.navigation.getParam('name')
        usacountry = this.props.navigation.getParam('item')
    }

    componentDidMount() {
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
        )
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
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <View>
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
                            <View style={{ height: window.height / 2 }}>
                                <BarGraph></BarGraph>
                            </View>
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

