import {
    FETCHING_USA_STATE,
    FETCH_USA_STATE_FAILURE,
    FETCH_USA_STATE_SUCCESS
}
    from '../../constants/APIConstants';

const initialState = {
    usaStateList: [],
    isFetching: true,
    error: false
}

export default function usaStateReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_USA_STATE:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_USA_STATE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                usaStateList: action.data
            }
        case FETCH_USA_STATE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}