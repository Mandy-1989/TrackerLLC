import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCovid_19List } from '../redux/actions/CovidInfo';
import AppImages from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '../components/navigator';
// import Icon from 'react-native-vector-icons/FontAwesome';
import StyleConfig from '../assets/StyleConfig'

class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchCovid_19List();
    }

    onClick = (clickType) => {
        this.props.navigation.navigate('WebLink', { data: clickType })
    }

    setMapIcon = (item) => {
        if (item.headerText == 'CONFIRMED CASES') {
            return <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10, alignItems: 'center' }}
                onPress={() => navigate('MapViewScreen',{item:true})}  >
                <Image source={AppImages.earth_image} style={{ height: 80, width: 80, paddingHorizontal: 5, marginVertical: 20 }} />
            </TouchableOpacity>
        }
    }

    render() {
        let confirmed = JSON.stringify(this.props.covidInfo.covid.confirmed);
        let recovered = JSON.stringify(this.props.covidInfo.covid.recovered);
        let deaths = JSON.stringify(this.props.covidInfo.covid.deaths)

        let DATA = [
            {
                id: 1,
                headerText: 'CONFIRMED CASES',
                subText: confirmed ? confirmed.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null,
                imageIcon: AppImages.earth_image,
                colorOne: '#EA674B',
                colorTwo: '#FF0202',
            },
            {
                id: 2,
                headerText: 'RECOVERED CASES',
                subText: recovered ? recovered.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null,
                colorOne: '#3890DA',
                colorTwo: '#085BB8'
            },
            {
                id: 3,
                headerText: 'TOTAL DEATHS',
                subText: deaths ? deaths.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null,
                colorOne: '#805CEC',
                colorTwo: '#4D1EB5'
            }
        ]
        switch (this.props.covidInfo.isFetching) {
            case true:
                return <View style={styles.viewLoader}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                return (
                    <View style={styles.viewParent} >
                        <View style={{ flex: 1, margin: 10 }}>
                            <View style={styles.firstContainer}>
                                <Image resizeMode={'contain'} source={AppImages.icon_image} style={{ height: 80, width: 80 }} />
                                <Text style={[styles.headerText]}>
                                    {'COVID-19 Global Cases'}
                                </Text>
                            </View>

                            {DATA.map(item => {
                                return (
                                    <LinearGradient start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={[item.colorOne, item.colorTwo]}
                                        style={[styles.infoCard]} >
                                        <TouchableOpacity onPress={() => navigate('CountryListScreen', { name: item.headerText, total: item.subText })} >
                                            <View style={styles.textContainer}>
                                                <Text style={styles.headerCardText}>{item.headerText}</Text>
                                                <Text style={styles.subText} >{item.subText}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {this.setMapIcon(item)}
                                    </LinearGradient>
                                )
                            })}

                            {/* <View style={styles.viewBottom}>
                                <TouchableOpacity style={styles.viewButton} onPress={() => this.onClick(1)}>
                                    <Text style={styles.txtButton}>FAQ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewButton} onPress={() => this.onClick(2)}>
                                    <Text style={styles.txtButton}>Find a Dr.</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewButton} onPress={() => this.onClick(3)}>
                                    <Text style={styles.txtButton}>News</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
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
        alignItems:'center',
        marginTop: Platform.OS ==='ios'? StyleConfig.countPixelRatio(40) : StyleConfig.countPixelRatio(20),
        marginBottom:StyleConfig.countPixelRatio(15)

    },
    headerText: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginLeft: 5,
        fontFamily: 'FiraSans-Medium'
    },
    infoCard: {
        marginVertical: Platform.OS ==='ios'? StyleConfig.countPixelRatio(10): StyleConfig.countPixelRatio(5) ,
        paddingHorizontal: 15,
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
    textContainer: {
        paddingHorizontal: 5,
        paddingVertical: 20
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)