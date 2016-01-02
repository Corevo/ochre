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
            <li style={{
                    listStyleType: 'none',
                    width: '530px'
                }}>
                <h3 style={{
                        marginBottom: '5px'
                    }}>
                    <a href={this.props.url} style={{
                            textDecoration: 'none'
                        }}>{this.props.title}</a>
                </h3>
                <span style={{
                        lineHeight: '1.3em'
                    }}>
                    <cite style={{
                            color: 'green',
                            display: 'block'
                        }}>{this.props.url}</cite>
                    <span dangerouslySetInnerHTML={{
                            __html: `${this.props.date} - ${this.props.summary}`
                        }} />
                </span>
            </li>
        );
    }
}
