import React, { Component } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCovid_19List } from '../redux/actions/CovidInfo';
import { fetchCovidCountry_19List } from '../redux/actions/Covid_CountryInfo';
import AppImages from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '../components/navigator';
import { string } from '../constants/String';
import colors from '../constants/Colors';
import StyleConfig from '../assets/StyleConfig';
import { ScrollView } from 'react-native-gesture-handler';

class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchCovid_19List();
        this.props.fetchCovidCountry_19List(2);
    }

    onClick = (clickType) => {
        this.props.navigation.navigate('WebLink', { data: clickType })
    }

    setMapIcon = () => {
        return <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10, alignItems: 'center' }}
            onPress={() => navigate('MapViewScreen', { item: true })}  >
            <Image source={AppImages.earth_image} style={{ height: 80, width: 80, paddingHorizontal: 5, marginVertical: 20 }} />
        </TouchableOpacity>
    }

    onCasesPressed = (title, count) => {
        navigate('CountryListScreen', { name: title, total: count })
    }

    render() {
        switch (this.props.covidInfo.isFetching) {
            case true:
                return <View style={styles.viewLoader}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                if (this.props.covidCountry.length > 0) {
                    let confirmed = JSON.stringify(this.props.covidInfo.covid.cases).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    let recovered = JSON.stringify(this.props.covidInfo.covid.recovered).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    let deaths = JSON.stringify(this.props.covidInfo.covid.deaths).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    let USATotalCases = JSON.stringify(this.props.covidCountry.cases).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    let USATotalDeaths = JSON.stringify(this.props.covidCountry.deaths).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    return (
                        <SafeAreaView style={styles.viewParent} >
                            <View style={{ flex: 1, margin: 10 }}>
                                <View style={styles.firstContainer}>
                                    <Image resizeMode={'contain'} source={AppImages.icon_image} style={{ height: 80, width: 80 }} />
                                    <Text style={styles.headerText}>
                                        {string.str_global_access}
                                    </Text>
                                </View>

                                <ScrollView style={{ flex: 1 }}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={[colors.color_7, colors.color_8]}
                                        style={[styles.infoCard, { paddingVertical: 5 }]} >

                                        <Text style={styles.txtCountry}>{string.str_unitedStatus}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={styles.txtTitle}>{string.str_total_cases}</Text>
                                                <Text style={styles.txtSubTitle}>{USATotalCases}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.txtTitle}>{string.str_total_death}</Text>
                                                <Text style={styles.txtSubTitle}>{USATotalDeaths}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>

                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={[colors.color_1, colors.color_2]}
                                        style={styles.infoCard} >
                                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.onCasesPressed(string.str_confirmed_case, confirmed)}>
                                            <Text style={styles.headerCardText}>{string.str_confirmed_case}</Text>
                                            <Text style={styles.subText} >{confirmed}</Text>

                                            {this.setMapIcon()}
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={[colors.color_3, colors.color_4]}
                                        style={styles.infoCard} >
                                        <TouchableOpacity onPress={() => this.onCasesPressed(string.str_death_case, deaths)}>
                                            <Text style={styles.headerCardText}>{string.str_death_case}</Text>
                                            <Text style={styles.subText}>{deaths}</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={[colors.color_5, colors.color_6]}
                                        style={styles.infoCard} >
                                        <TouchableOpacity onPress={() => this.onCasesPressed(string.str_recovered_case, recovered)}>
                                            <Text style={styles.headerCardText}>{string.str_recovered_case}</Text>
                                            <Text style={styles.subText}>{recovered}</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    )
                }
                else {
                    return <View></View>
                }
        }
    }
}

function mapStateToProps(state) {
    return {
        covidInfo: state.covid,
        covidCountry: state.covidCountry.covidCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCovid_19List, fetchCovidCountry_19List }, dispatch)
    }
}

const styles = StyleSheet.create({
    viewLoader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewParent: {
        flex: 1,
        backgroundColor: '#F9FEFF'
    },
    firstContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? StyleConfig.countPixelRatio(40) : StyleConfig.countPixelRatio(20),
        marginBottom: StyleConfig.countPixelRatio(15)

    },
    headerText: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 5,
        color: colors.grey,
        fontFamily: 'FiraSans-Bold'
    },
    infoCard: {
        marginVertical: Platform.OS === 'ios' ? StyleConfig.countPixelRatio(10) : StyleConfig.countPixelRatio(5),
        padding: 15,
        justifyContent: 'center',
        borderRadius: 10,
        flex: 0.3,
        shadowColor: '#939393',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 0.9,
        shadowOpacity: 0.8,
    },
    headerCardText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'FiraSans-Bold'
    },
    subText: {
        fontSize: 34,
        color: 'white',
        fontFamily: 'FiraSans-Bold'
    },
    viewBottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 10
    },
    viewButton: {
        backgroundColor: '#5C9FEC',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    txtButton: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'FiraSans-Bold'
    },
    txtCountry: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'FiraSans-Medium',
        fontSize: 20
    },
    txtTitle: {
        color: 'white',
        fontFamily: 'FiraSans-Medium',
        fontSize: 18
    },
    txtSubTitle: {
        color: 'white',
        fontFamily: 'FiraSans-Medium',
        fontSize: 16,
        textAlign: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)