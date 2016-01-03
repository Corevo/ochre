import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { reduxReactRouter, ReduxRouter, pushState } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createHistory } from 'history';
import searchApp from './redux/reducers';
import { addResults, showResults } from './redux/actions';
import Results from './views/results';
import request from 'superagent';

let store = compose(
    reduxReactRouter({ createHistory })
)(createStore)(searchApp);
const dispatch = store.dispatch;

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    }
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.change = this.change.bind(this);
        this.press = this.press.bind(this);
        this.state = {
            pristine: true,
            rtl: false
        }
    }
    reset() {
        dispatch(showResults(false));
        this.setState({
            pristine: true
        });
        this.refs.input.value = "";
    }
    change() {
        this.setState({
            pristine: false,
            rtl: (this.refs.input.value.length > 0 && this.refs.input.value[0].charCodeAt() > 255)
        });
    }
    press(event) {
        if (event.key === 'Enter') {
            request.get('/api/s/' + this.refs.input.value).end((err, res) => {
                if (!err) {
                    dispatch(addResults(JSON.parse(res.text)));
                    dispatch(showResults(true));
                }
            });
        }
    }
    render () {
        return (
            <div>
            <div className="animated-container" style={ this.state.pristine ? {
                    paddingTop: '150px'
                } : {
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '15px',
                    backgroundColor: 'whitesmoke',
                    borderStyle: 'solid',
                    borderColor: '#D8D8D8',
                    borderWidth: '0px 0px 1px 0px'
                }}>
                <div className="animated-container" style={ this.state.pristine ? {
                        margin: '0 auto',
                        maxWidth: 'none',
                        width: '1139px',
                        textAlign: 'center'
                    } : {
                        textAlign: 'left'
                    }}>
                    <div className="animated-container" style={ this.state.pristine ? {} : {
                            display: 'inline-block',
                            verticalAlign: 'middle'
                        }}>
                        <a onClick={this.reset}>
                            { this.state.pristine ? <img src="/assets/images/logo.png" height="100" /> : undefined }
                            <h1 className="animated-title" style={ this.state.pristine ? {
                                    fontSize: '4.5em',
                                    marginBottom: '30px',
                                    display: 'inline-block'
                                } : {
                                    fontSize: '2em',
                                    marginBottom: '0px',
                                    marginTop: '0px',
                                    marginRight: '15px',
                                    fontWeight: 'normal'
                                }}>חיפוש</h1>
                        </a>
                    </div>
                    <div className="animated-container" style={ this.state.pristine ? {} : {
                            display: 'inline-block',
                            width: '770px'
                        }}>
                        <input ref="input" onChange={this.change} onKeyPress={this.press} autoComplete="off" className="animated-input" type="text" id="q" name="q"
                            style={ this.state.rtl ? {
                                direction: 'rtl'
                            } : {
                                direction: 'ltr'
                            }} />
                    </div>
                    <div style={{
                            marginTop: '30px'
                        }}>
                        <input id="tags" type="checkbox" value="tags" />
                        <label htmlFor="tags" style={{
                                verticalAlign: 'text-bottom'
                            }}>חיפוש בעזרת תגיות בלבד</label>
                    </div>
                </div>
            </div>
            <div style={{
                    paddingLeft: '117px'
                }}>{ this.props.showResults ? <Results results={ this.props.results } /> : this.state.pristine ? null : <p>Press Enter to search.</p> }</div>
            </div>
        );
    }
}

let Appx = connect(
    // Use a selector to subscribe to state
    state => ({
        q: state.router.location.query.q,
        results: state.results,
        showResults: state.showResults
    }),
    // Use an action creator for navigation
    { pushState }
)(App);

let routes = (
    <Route path="/" component={Appx}>
        <Route path="/:q" component={Results} />
    </Route>
);

class Root extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        {routes}
                    </ReduxRouter>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));
