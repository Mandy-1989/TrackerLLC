import { combineReducers } from 'redux';
import covid from './covid-19';
import country from './country';
import countryList from './countryList';

const rootReducer = combineReducers({
    covid, country, countryList
})

export default rootReducer