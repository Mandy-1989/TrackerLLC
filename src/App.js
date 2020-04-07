import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Provider } from 'react-redux';
import configureStore from './redux/Store/configureStore';

import SplashScreen from "./components/Splash";
import MapViewScreen from "./components/MapViewScreen";
import CountryListScreen from "./components/CountryListScreen";
import BarGraphScreen from "./components/BarGraph";
import MapScreen from "./components/Map";
import TabNavigatorScreen from "./components/TabNavigator";
import { setNavigator } from './components/navigator';
import Splash from 'react-native-splash-screen';

const store = configureStore()

export default class App extends Component {
    componentDidMount() {
        Splash.hide()
    }

    render() {
        return <Provider store={store}>
            <AppContainer ref={nav => setNavigator(nav)} />
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
    BarGraph: {
        screen: BarGraphScreen,
        navigationOptions: {
            title: 'Home',
            headerShown: false //this will hide the header
        },
    },
    Map: {
        screen: MapScreen,
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