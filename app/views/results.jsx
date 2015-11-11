import React from 'react';
import ResultItem from '../partials/results/result-item.jsx';

export default class Results extends React.Component {
    render () {
        return (
            <ol style={{
                    paddingLeft: '0px'
                }}>
                <ResultItem title="Google" url="https://www.google.com/" date="Sep 4, 1988" summary="Google Inc. is an American multinational technology company specializing in Internet-related services and products." />
            </ol>
        );
    }
}
