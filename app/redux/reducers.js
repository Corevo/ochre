import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { ADD_RESULTS } from './actions';

function results(state = [], action) {
    switch (action.type) {
        case ADD_RESULTS:
        return results;
        default:
        return state;
    }
}

const reducers = combineReducers({
    router: routerStateReducer,
    results
});

export default reducers;
