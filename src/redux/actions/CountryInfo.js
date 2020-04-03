import { FETCH_COUNTRY_SUCCESS, FETCH_COUNTRY_FAILURE, FETCHING_COUNTRY } from '../../constants/APIConstants';
import axios from 'axios';

export function fetchCountryData() {
    return (dispatch) => {
        dispatch(getCountryData())
        axios.get('https://corona.lmao.ninja/countries/USA').then(response => {
            return (dispatch(getCountryDataSuccess(response.data)))
        }).catch(err => dispatch(getCountryDataFailure(err)))
    }
}

function getCountryData() {
    return {
        type: FETCHING_COUNTRY
    }
}

function getCountryDataSuccess(data) {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        data
    }
}

function getCountryDataFailure(error) {
    return {
        type: FETCH_COUNTRY_FAILURE
    }
}