import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { reduxReactRouter, ReduxRouter, pushState } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createHistory } from 'history';
import searchApp from './redux/reducers';
import { addResults } from './redux/actions';
import Results from './views/results.jsx';

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
        this.swap = this.swap.bind(this);
        this.type = this.type.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            pristine: true
        }
    }
    type() {
        this.setState({
            pristine: false
        });
    }
    reset() {
        this.setState({
            pristine: true
        });
        this.refs.input.value = "";
    }
    swap() {
        this.setState({
            pristine: !this.state.pristine
        });
    }
    render () {
        return (
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
                            <h1 className="animated-title" style={ this.state.pristine ? {
                                    fontSize: '4.5em',
                                    marginBottom: '30px'
                                } : {
                                    fontSize: '2em',
                                    marginBottom: '0px',
                                    marginTop: '0px',
                                    marginRight: '15px',
                                    fontWeight: 'normal'
                                }}>Ochre</h1>
                        </a>
                    </div>
                    <div className="animated-container" style={ this.state.pristine ? {} : {
                            display: 'inline-block',
                            width: '770px'
                        }}>
                        <input ref="input" onKeyPress={this.type} className="animated-input" type="search" id="q" name="q" style={{
                                padding: '7px',
                                fontSize: '1.2em',
                                width: '65%'
                            }} />
                    </div>
                </div>
            </div>
        );
    }
}

let Appx = connect(
    // Use a selector to subscribe to state
    state => ({
        q: state.router.location.query.q,
        results: state.results
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
