import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import reducers from './reducers';
import swDev from './swDev';
import Context from './Context';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
<Provider store={store}>
    <Context>
    <App />
    </Context>
    </Provider>,
 document.getElementById('root')
 );
 swDev();
