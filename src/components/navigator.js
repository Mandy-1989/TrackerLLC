import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(nav) {
    navigator = nav;
}

export function navigate(routeName, params) {
    console.log("routeName:" + routeName)
    if (navigator) {
        console.log("routeName:::::::" + routeName)
        navigator.dispatch(NavigationActions.navigate({ routeName, params }));
    }
}