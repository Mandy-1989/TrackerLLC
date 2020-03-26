import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Provider } from 'react-redux';
import configureStore from './redux/Store/configureStore';

import SplashScreen from "./components/Splash";
import DashboardScreen from "./components/Dashboard";

const store = configureStore()

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <AppContainer />
        </Provider>
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