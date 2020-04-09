import React from 'react'
import { SafeAreaView, View, Dimensions, StyleSheet, Text } from 'react-native'


export const Graph1 = (props) =>
    <View>
        <View style={style.graphContainer}>
            <View style={style.deathCases}>
                <Text style={[style.textStyle, { color: 'rgba(29, 152, 173, 0.7)' }]}>{props.deaths}</Text>
            </View>
            <View style={style.totalCases}>
                <Text style={[style.textStyle, { color: 'rgba(145, 51, 204, 0.7)' }]}>{props.cases}</Text>
                <View style={style.dailyCases}>
                    <Text style={[style.textStyle, { color: 'rgba(240, 62, 139, 1)' }]}>{props.recovered}</Text>
                </View>

            </View>
        </View>
        <View style={style.horizontalLine}></View>
    </View>


const style = StyleSheet.create({
    graphContainer: {
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
        height: 200,
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
        height: 60,
        width: Dimensions.get('window').width - 50,
        backgroundColor: 'rgba(29, 152, 173, 0.2)',
        position: 'absolute'
    },
    totalCases: {
        height: 170,
        width: Dimensions.get('window').width - 150,
        backgroundColor: 'rgba(145, 51, 204, 0.2)',
        flexDirection: 'row',
    },
    dailyCases: {
        alignSelf: 'flex-end',
        height: 100,
        width: '60%',
        backgroundColor: 'rgba(240, 62, 139, 1)',
        position: 'absolute'
    }

})