/*
 * action types
 */

export const ADD_RESULTS = 'ADD_RESULTS';

/*
 * action creators
 */

export function addResults(results) {
    return { type: ADD_RESULTS, results };
}
