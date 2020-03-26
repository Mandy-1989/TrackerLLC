import {
    FETCH_COVID_SUCCESS,
    FETCH_COVID_FAILURE,
    FETCHING_COVID_19
} from '../../constants/APIConstants';

const initialState = {
    covid: {},
    isFetching: false,
    error: false
}

export default function covidReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COVID_19:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COVID_SUCCESS:
            return {
                ...state,
                isFetching: false,
                covid: action.data
            }
        case FETCH_COVID_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}