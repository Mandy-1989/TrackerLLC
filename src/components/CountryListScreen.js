import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import AppImages from '../assets/images';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class CountryListScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchCovidCountry_19List();
    }

    render() {
        const covidInfo = this.props.navigation.getParam('name')
        const total = this.props.navigation.getParam('total')
        console.log({ covidInfo })
        let data;

        if (this.props.covidCountry !== undefined && this.props.covidCountry.covidCountry !== undefined && this.props.covidCountry.covidCountry.data !== undefined) {
            data = this.props.covidCountry.covidCountry.data.country;
        }



        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <TouchableOpacity style={{ marginTop: 50, marginHorizontal: 20 }} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{ fontSize: 20 }}>Back</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 25 }}>
                    <Text style={{ fontSize: 28 }}>
                        {covidInfo === 'CONFIRMED CASES' ? 'Total Confirmed' : null}
                    </Text><Text style={{ fontSize: 28 }}>
                        {covidInfo === 'RECOVERED CASES' ? 'Total Recovered' : null}
                    </Text>
                    <Text style={{ fontSize: 28 }}>
                        {covidInfo === 'TOTAL DEATHS' ? 'Total Deaths' : null}
                    </Text>
                    <Text style={{ fontSize: 40, marginTop: 5, color: 'red' }}>
                        {total}
                    </Text>
                </View>

                {!this.props.covidCountry.isFetching ?

                    <View style={{ marginBottom: 50 }}>
                        <FlatList
                            data={data && data.length !== 0 && data !== undefined ? data : null}
                            renderItem={({ item }) => {
                                console.log({ item })
                                if (covidInfo === 'RECOVERED CASES') {
                                    return (
                                        <View style={styles.flatlistView}>
                                            <View style={{ flex: 0.7 }}>
                                                <Text style={[styles.textStyle, { color: 'red' }]}>{item.recovered}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2 }}>
                                                <Text style={styles.textStyleTwo}>{item.name}</Text>
                                            </View>
                                        </View>
                                    )
                                } else if (covidInfo === 'CONFIRMED CASES') {
                                    return (
                                        <View style={styles.flatlistView}>
                                        <View style={{ flex: 0.7 }}>
                                            <Text style={[styles.textStyle, { color: 'red' }]}>{item.confirmed}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2 }}>
                                            <Text style={styles.textStyleTwo}>{item.name}</Text>
                                        </View>
                                    </View>
                                    )
                                } else {
                                    return (
                                        <View style={styles.flatlistView}>
                                            <View style={{ flex: 0.7 }}>
                                                <Text style={[styles.textStyle, { color: 'red' }]}>{item.deaths}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2 }}>
                                                <Text style={styles.textStyleTwo}>{item.name}</Text>
                                            </View>
                                        </View>
                                    )
                                }

                            }}
                        />
                        <View style={{ height: 100 }} />
                    </View>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} />
                    </View>


                }

            </View>

        )
    }
}
const styles = StyleSheet.create({
    viewParent: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#ffff',
        // marginHorizontal:10,
    },
    flatlistView: {
        borderBottomWidth: .5,
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: "center"
    },
    textStyle: {
        fontSize: 30,
        paddingHorizontal: 5,
        paddingLeft: 25,
        paddingVertical: 5,
        textAlign: 'justify'
    },
    textStyleTwo: {
        fontSize: 26,
        paddingHorizontal: 5,
        paddingLeft: 30,
        paddingVertical: 5,
        textAlign: 'justify'
    }
})

function mapStateToProps(state) {
    return {
        covidCountry: state.covidCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovidCountry_19List }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListScreen)