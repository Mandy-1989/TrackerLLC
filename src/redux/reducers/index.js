import { combineReducers } from 'redux';
import covid from './covid-19';
import covidCountry from './covid_country-19';
import countryList from './countryList';

const rootReducer = combineReducers({
    covid, covidCountry, countryList
})

export default rootReducer