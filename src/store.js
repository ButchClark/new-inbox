import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as reducers from './reducers'
import logger from 'redux-logger'
import {AllSelected,SomeSelected,NoneSelected} from "./App";

const initialState = {
    messages: {
        messages: [],
        selectedStyle: NoneSelected
    },
    unreadMessages: 0

}

const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(
        applyMiddleware(
            thunk,
            logger
        )
    ))

export default store