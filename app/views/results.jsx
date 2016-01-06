import React from 'react';
import ResultItem from '../partials/results/result-item';

export default class Results extends React.Component {
    render () {
        return (
            <ol style={{
                    paddingRight: '0px'
                }}>
                { this.props.results.map(result => (
                    <ResultItem key={ result.title } title={result.title} url={ result.url } date={ new Date(result.date).toDateString() } summary={ result.desc ? result.desc.substr(0, 350) : '' } />
                ))}
            </ol>
        );
    }
}
