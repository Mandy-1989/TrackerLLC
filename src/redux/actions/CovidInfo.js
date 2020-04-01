import { FETCH_COVID_SUCCESS, FETCH_COVID_FAILURE, FETCHING_COVID_19 } from '../../constants/APIConstants';
import axios from 'axios';

export function fetchCovid_19List() {
    return (dispatch) => {
        dispatch(getCovid_19List())

        // axios.get('http://52.8.183.199/api/dashboard/count')    
        axios.get('https://corona.lmao.ninja/all')

            .then(response => {
                console.log('resonse',response)
                return (dispatch(getCovidSuccess(response.data)))
            })
            .catch(err => dispatch(getCovidFailure(err)))
    }
}

function getCovid_19List() {
    return {
        type: FETCHING_COVID_19
    }
}

function getCovidSuccess(data) {
    return {
        type: FETCH_COVID_SUCCESS,
        data
    }
}

function getCovidFailure(error) {
    return {
        type: FETCH_COVID_FAILURE
    }
}