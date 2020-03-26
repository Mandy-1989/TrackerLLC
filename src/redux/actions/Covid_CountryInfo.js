import { FETCH_COVID_COUNTRY_SUCCESS, FETCH_COVID_COUNTRY_FAILURE, FETCHING_COVID_COUNTRY_INFO } from '../../constants/APIConstants';
import axios from 'axios';

export function fetchCovidCountry_19List() {
    return (dispatch) => {
        dispatch(getCovid_19List())

        axios.get('http://52.8.183.199/api/country/detail')
            .then(response => {
                return (dispatch(getCovidSuccess(response)))
            })
            .catch(err => dispatch(getCovidFailure(err)))
    }
}

function getCovid_19List() {
    return {
        type: FETCHING_COVID_COUNTRY_INFO
    }
}

function getCovidSuccess(data) {
    return {
        type: FETCH_COVID_COUNTRY_SUCCESS,
        data
    }
}

function getCovidFailure(error) {
    return {
        type: FETCH_COVID_COUNTRY_FAILURE
    }
}