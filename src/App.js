import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "./components/Splash";
import DashboardScreen from "./components/Dashboard";

export default class App extends Component {
    render() {
        return <AppContainer />
    }
}

const AppNavigator = createStackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            title: 'Home',
            header: null //this will hide the header
        },
    },
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            title: 'Home',
            header: null //this will hide the header
        },
    }
},
    {
        initialRouteName: 'Splash',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#3482D3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const AppContainer = createAppContainer(AppNavigator);