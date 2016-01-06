import React from 'react';
import moment from 'moment';

const format = "dddd, Do בMMMM YYYY";
moment.format = format;
moment.locale('he');

export default class ResultItem extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        summary: React.PropTypes.string.isRequired,
        author: React.PropTypes.string,
        unit: React.PropTypes.string
    }
    render() {
        let optionalAuthor = this.props.unit ? this.props.unit + ' ' : '';
        optionalAuthor += this.props.author ? this.props.author + ' ' : '';
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
                            display: 'block',
                            direction: 'ltr'
                        }}>{this.props.url}</cite>
                    <span><em>{`${moment(new Date(this.props.date)).format(format)} ${optionalAuthor}`}</em></span>
                    <span dangerouslySetInnerHTML={{
                            __html: `${this.props.summary}`
                        }} />
                </span>
            </li>
        );
    }
}
