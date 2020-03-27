import {
    FETCH_COVID_COUNTRY_SUCCESS,
    FETCH_COVID_COUNTRY_FAILURE,
    FETCHING_COVID_COUNTRY_INFO
} from '../../constants/APIConstants';

const initialState = {
    covidCountry: [],
    isFetching: false,
    error: false
}

export default function covidCountryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COVID_COUNTRY_INFO:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COVID_COUNTRY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                covidCountry: action.data
            }
        case FETCH_COVID_COUNTRY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}