/*
 * action types
 */

export const ADD_RESULTS = 'ADD_RESULTS';
export const SHOW_RESULTS = 'SHOW_RESULTS';

/*
 * action creators
 */

export function addResults(results) {
    return { type: ADD_RESULTS, results };
}

export function showResults(show) {
    return { type: SHOW_RESULTS, show };
}
