import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Dashboard from "./Dashboard";
import MapViewScreen from "./MapViewScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './Calendar';
import News from './News';
import FAQ from './FAQ';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styleconfig from '../assets/StyleConfig'
import StyleConfig from '../assets/StyleConfig';
function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                // const icon =
                //     options.tabBarLabel !== undefined
                //         ? options.tabBarLabel
                //         : options.title !== undefined
                //             ? options.title
                //             : route.name;

                const icon = route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // const onLongPress = () => {
                //     navigation.emit({
                //         type: 'tabLongPress',
                //         target: route.key,
                //     });
                // };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ flex: 1, paddingVertical: StyleConfig.countPixelRatio(16) }}>
                        {
                            icon == 'questioncircleo' ?
                                <AntDesign style={{ alignSelf: 'center' }} name={icon} size={30} color={isFocused ? '#673ab7' : '#222'} /> :
                                <Entypo style={{ alignSelf: 'center' }} name={icon} size={30} color={isFocused ? '#673ab7' : '#222'} />
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                <Tab.Screen name="home" component={Dashboard} />
                <Tab.Screen name="globe" component={MapViewScreen} />
                <Tab.Screen name="calendar" component={Calendar} />
                <Tab.Screen name="news" component={News} />
                <Tab.Screen name="questioncircleo" component={FAQ} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}