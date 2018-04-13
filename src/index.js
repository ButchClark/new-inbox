import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {getMessages} from './actions/index'
import {Provider} from 'react-redux'
import store from './store'
import {AllSelected,SomeSelected,NoneSelected} from "./App";
import {unreadMessageCount, setSelectedStyle, toggleShowCompose} from "./actions";

store.dispatch(unreadMessageCount(1))
store.dispatch(setSelectedStyle(NoneSelected))
store.dispatch(getMessages())

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
