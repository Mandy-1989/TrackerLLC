import { combineReducers } from 'redux';
import covid from './covid-19';
import country from './country';
import countryList from './countryList';
import usaStateList from './usaStateList';

const rootReducer = combineReducers({
    covid, country, countryList, usaStateList
})

export default rootReducer