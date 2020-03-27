import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Provider } from 'react-redux';
import configureStore from './redux/Store/configureStore';

import SplashScreen from "./components/Splash";
import MapViewScreen from "./components/MapView";
import CountryListScreen from "./components/CountryListScreen";
import TabNavigatorScreen from "./components/TabNavigator";


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
            headerShown: false //this will hide the header
        },
    },
    TabNavigator: {
        screen: TabNavigatorScreen,
        navigationOptions: {
            title: 'Home',
            headerShown: false //this will hide the header
        },
    },

    // Dashboard: {
    //     screen: DashboardScreen,
    //     navigationOptions: {
    //         title: 'Home',
    //         headerShown: false //this will hide the header
    //     },
    // },
    MapViewScreen: {
        screen: MapViewScreen,
        navigationOptions: {
            title: 'Home',
            headerShown: false //this will hide the header
        },
    },
    CountryListScreen: {
        screen: CountryListScreen,
        navigationOptions: {
            title: 'Home',
            headerShown: false //this will hide the header
        },
    },
    // WebLink: {
    //     screen: WebLinkScreen,
    //     navigationOptions: {
    //         title: 'Home',
    //         headerShown: false //this will hide the header
    //     }
    // }
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