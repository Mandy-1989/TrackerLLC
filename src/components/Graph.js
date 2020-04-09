import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'

const fill = 'rgb(78, 66, 245)'
const data = [20, 55, 59, 59, 25, 29, 25, 29, 35, 45, 55, 59, 59, 25, 29, 35, 45, 55, 59, 59, 25, 29, 35, 45, 55, 59, 59]
const contentInset = { top: 5, bottom: 5, }


export const Graph = (props) =>
    <View>
        <View
            style={style.graphContainer}>
            <YAxis
                style={style.yAxisStyle}
                data={props.data}
                contentInset={contentInset}
                svg={{ fill: 'grey', fontSize: 11, }}
                numberOfTicks={3}
                formatLabel={value => parseInt(value)}
            />
            <View style={style.verticleLine}></View>
            <BarChart
                spacingInner={0.60}
                style={style.barChart}
                data={props.data}
                svg={{ fill }}
                numberOfTicks={3}
                contentInset={{ top: 0, bottom: 0 }}

            >
                <Grid />
            </BarChart>
        </View>
        <View style={style.horizontalLine}></View>
        <XAxis
            style={{
                marginTop: 5,
                marginLeft: 55,
                width: Dimensions.get('window').width - 100,
                alignSelf: 'center'
            }}
            data={props.data}
            xAccessor={props.xAccessor}
            formatLabel={props.formatLabel}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
        />
        <XAxis
            style={{
                marginTop: -5,
                marginLeft: 55,
                width: Dimensions.get('window').width - 100,
                alignSelf: 'center'
            }}
            data={props.data}
            xAccessor={props.xAccessor}
            formatLabel={props.formatLabel1}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 7, fill: 'black' }}
        />

    </View>




const style = StyleSheet.create({
    graphContainer: {
        width: Dimensions.get('window').width - 30,
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',

    },
    yAxisStyle: {
        width: 70,
        paddingLeft: 3,
        paddingRight: 3,
        height: 200,
        alignItems: 'flex-end',
        textAlign: 'right'
        // backgroundColor: 'yellow'
    },
    verticleLine: {
        width: 1,
        height: 200,
        backgroundColor: 'grey',
    },
    barChart: {
        paddingTop: 5,
        height: 200,
        width: Dimensions.get('window').width - 100,

    },

    horizontalLine: {
        width: Dimensions.get('window').width - 50,
        height: 1,
        backgroundColor: 'grey',
        marginLeft: 0,
        alignSelf: 'center'
    },
    xAxis: {
        width: '90%',
        height: 50,
        marginLeft: 50,
        alignItems: 'center',
        backgroundColor: "green"
    },
    monthText: {
        paddingTop: 5,
        color: 'grey',
        fontSize: 12
    }

})