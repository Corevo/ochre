import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { ADD_RESULTS, SHOW_RESULTS } from './actions';

function results(state = [], action) {
    switch (action.type) {
        case ADD_RESULTS:
        return action.results;
        default:
        return state;
    }
}

function showResults(state = false, action) {
    switch (action.type) {
        case showResults:
        return action.show;
        default:
        return state;
    }
}

const reducers = combineReducers({
    router: routerStateReducer,
    results,
    showResults
});

export default reducers;
