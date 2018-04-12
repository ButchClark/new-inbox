import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {getMessages} from './actions/index'
import {Provider} from 'react-redux'
import store from './store'
import {AllSelected,SomeSelected,NoneSelected} from "./App";
import {unreadMessageCount,setSelectedStyle} from "./actions";

store.dispatch(getMessages())
store.dispatch(unreadMessageCount(9))
store.dispatch(setSelectedStyle(NoneSelected))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
