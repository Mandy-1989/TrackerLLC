import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { SafeAreaView, View, Dimensions, StyleSheet, Text } from 'react-native'

export default class BarGraph extends React.PureComponent {

    render() {
        const fill = 'rgb(78, 66, 245)'
        const data = [20, 40, 60, 15, 25, 29, 35, 45, 55, 59, 59, 25, 29, 35, 45, 55, 59, 59, 25, 29, 35, 45, 55, 59, 59]
        const contentInset = { top: 5, bottom: 0 }

        return (
            <SafeAreaView>
                <View style={{ marginTop: 20 }}>
                    <View
                        style={style.graphContainer}>
                        <YAxis
                            style={style.yAxisStyle}
                            data={data}
                            contentInset={contentInset}
                            svg={{ fill: 'grey', fontSize: 11, }}
                            numberOfTicks={3}
                            formatLabel={value => `${value} K`}
                        />
                        <View style={style.verticleLine}></View>
                        <BarChart
                            style={style.barChart}
                            data={data}
                            svg={{ fill }}
                            numberOfTicks={3}
                            contentInset={{ top: 0, bottom: 0 }}
                        >
                            <Grid />
                        </BarChart>
                    </View>
                    <View style={style.horizontalLine}></View>

                    {/* <View style={{
                        flexDirection: 'row',
                        width: Dimensions.get('window').width - 50,
                        alignSelf: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={style.monthText}>Mar</Text>
                        <Text style={style.monthText}>Apr</Text>
                    </View> */}

                    <XAxis
                        style={{ marginHorizontal: -10, width: Dimensions.get('window').width - 50, alignSelf: 'center' }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />

                </View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    graphContainer: {
        width: Dimensions.get('window').width - 50,
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',

    },
    yAxisStyle: {
        width: 30,
        height: 200,
        alignItems: 'flex-start',
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
        width: Dimensions.get('window').width - 70,
        marginLeft: -10,
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
        //  backgroundColor: "green"
    },
    monthText: {
        paddingTop: 5,
        color: 'grey',
        fontSize: 12
    }
})