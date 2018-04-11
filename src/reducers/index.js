import {combineReducers} from 'redux'
import {INCREMENT_UNREAD_MESSAGES, MESSAGES_RECEIVED, UNREAD_MESSAGES} from "../actions";
import {NoneSelected} from "../App";

const initialState = {
    messages: [],
    unreadMessages: 3,
    selectedStyle: NoneSelected
}

function messages( state = initialState, action){
    console.log(`> reducers.messages- state: ${JSON.stringify(state)}`)
    switch(action.type){
        case MESSAGES_RECEIVED:
            console.log(`> reducers.messages: action.type: ${action.type}`)
            return action.messages

        default:
            console.log(`> reducers.messages: action.type: ${action.type}`)
            return state
    }
}
function unreadMessages( state = initialState, action){
    console.log(`> reducers.unreadMessages: action: ${action.unreadMessages}`)
    switch(action.type){
        case UNREAD_MESSAGES:
            return action.unreadMessages

        case INCREMENT_UNREAD_MESSAGES:
            console.log('>reducer.INCREMENT_UNREAD_MESSAGES')
            return state.unreadMessages + 1

        default:
            return state
    }

}
export default combineReducers({
    messages,
    unreadMessages
})