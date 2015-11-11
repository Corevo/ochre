import React from 'react';

export default class ResultItem extends React.Component {
    static propTypes = {
        title: React.propTypes.string.isRequired,
        url: React.propTypes.string.isRequired,
        date: React.propTypes.string.isRequired,
        summary: React.propTypes.string.isRequired
    }
    render() {
        return (
            <li>
                <h3><a href={this.props.url}>{this.props.title}</a></h3>
                <cite>{this.props.url}</cite>
                <span>{this.props.date} - {this.props.summary}</span>
            </li>
        );
    }
}
