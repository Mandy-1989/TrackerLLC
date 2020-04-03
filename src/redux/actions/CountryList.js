import { FETCH_COUNTRY_LIST_SUCCESS, FETCH_COUNTRY_LIST_FAILURE, FETCHING_COUNTRY_LIST } from '../../constants/APIConstants';
import axios from 'axios';

export function fetchCountryList() {
    let URL = "https://corona.lmao.ninja/countries?sort=country";
    return (dispatch) => {
        dispatch(getCountryList())
        axios.get(URL).then(response => {
            return (dispatch(getCountryListSuccess(response.data)))
        }).catch(err => dispatch(getCountryListFailure(err)))
    }
}

function getCountryList() {
    return {
        type: FETCHING_COUNTRY_LIST
    }
}

function getCountryListSuccess(data) {
    return {
        type: FETCH_COUNTRY_LIST_SUCCESS,
        data
    }
}

function getCountryListFailure(error) {
    return {
        type: FETCH_COUNTRY_LIST_FAILURE
    }
}