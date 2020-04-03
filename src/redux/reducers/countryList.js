import {
    FETCH_COUNTRY_LIST_SUCCESS,
    FETCH_COUNTRY_LIST_FAILURE,
    FETCHING_COUNTRY_LIST
} from '../../constants/APIConstants';

const initialState = {
    countryList: [],
    isFetching: true,
    error: false
}

export default function covidCountryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COUNTRY_LIST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COUNTRY_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                countryList: action.data
            }
        case FETCH_COUNTRY_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}