import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { SafeAreaView, View, Dimensions, StyleSheet, Text } from 'react-native'

const totalCases = 180
const dailyCases = 150
const deathCases = 20

export default class TabGraph extends React.PureComponent {

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView>
                <View style={style.graphContainer}>
                    <View style={style.deathCases}>
                        <Text style={[style.textStyle, { color: 'rgba(29, 152, 173, 0.5)' }]}>{deathCases}</Text>
                    </View>
                    <View style={style.totalCases}>
                        <Text style={[style.textStyle, { color: 'rgba(145, 51, 204, 0.4)' }]}>{totalCases}</Text>
                        <View style={style.dailyCases}>
                            <Text style={[style.textStyle, { color: 'rgba(240, 62, 139, 1)' }]}>{dailyCases}</Text>
                        </View>

                    </View>
                </View>
                <View style={style.horizontalLine}></View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    graphContainer: {
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
        height: 250,
        alignItems: 'flex-end',
        alignSelf: 'center',
        backgroundColor: 'rgba(240, 62, 139, 0.05)'
    },
    textStyle: {
        fontSize: 11,
        marginTop: -17,
        textAlign: 'right',
        flex: 1,
        paddingRight: 2,
    },
    horizontalLine: {
        width: Dimensions.get('window').width - 50,
        height: 1,
        backgroundColor: 'grey',
        marginLeft: 0,
        alignSelf: 'center'
    },
    deathCases: {
        alignSelf: 'flex-end',
        height: 80,
        width: Dimensions.get('window').width - 50,
        backgroundColor: 'rgba(29, 152, 173, 0.2)',
        position: 'absolute'
    },
    totalCases: {
        height: 190,
        width: Dimensions.get('window').width - 150,
        backgroundColor: 'rgba(145, 51, 204, 0.2)',
        flexDirection: 'row',
    },
    dailyCases: {
        alignSelf: 'flex-end',
        height: 130,
        width: '60%',
        backgroundColor: 'rgba(240, 62, 139, 1)',
        position: 'absolute'
    }

})