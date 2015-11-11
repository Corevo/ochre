import React from 'react';

export default class ResultItem extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        summary: React.PropTypes.string.isRequired
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
