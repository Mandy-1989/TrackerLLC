import { FETCHING_USA_STATE, FETCH_USA_STATE_FAILURE, FETCH_USA_STATE_SUCCESS } from '../../constants/APIConstants';
import axios from 'axios';

export function fetchUsaStateData() {
    return (dispatch) => {
        dispatch(getUsaStateData())
        axios.get('https://corona.lmao.ninja/states').then(response => {
            return (dispatch(getUsaStateDataSuccess(response.data)))
        }).catch(err => dispatch(getUsaStateDataFailure(err)))
    }
}

function getUsaStateData() {
    return {
        type: FETCHING_USA_STATE
    }
}

function getUsaStateDataSuccess(data) {
    return {
        type: FETCH_USA_STATE_SUCCESS,
        data
    }
}

function getUsaStateDataFailure(error) {
    return {
        type: FETCH_USA_STATE_FAILURE
    }
}