import {
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAILURE,
    FETCHING_COUNTRY
} from '../../constants/APIConstants';

const initialState = {
    countryInfo: {},
    isFetching: true,
    error: false
}

export default function countryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COUNTRY:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                countryInfo: action.data
            }
        case FETCH_COUNTRY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}