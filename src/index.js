import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {getMessages} from './actions/index'
import {Provider} from 'react-redux'
import store from './store'
import {unreadMessageCount} from "./actions";

store.dispatch(getMessages())
    .then((x) => {
        console.log("got back resolved from getMessages()")
    })
store.dispatch(unreadMessageCount(9))
    .then((X) => {
        console.log("got back resolved from unreadMessageCount()")
    })

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
