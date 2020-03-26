import { combineReducers } from 'redux';
import covid from './covid-19';
import covidCountry from './covid_country-19';

const rootReducer = combineReducers({
    covid, covidCountry
})

export default rootReducer