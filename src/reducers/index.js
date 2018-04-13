import {
    INCREMENT_UNREAD_MESSAGES,
    MESSAGES_RECEIVED,
    UNREAD_MESSAGES,
    SELECTED_STYLE,
    SHOW_COMPOSE
} from "../actions";
import {NoneSelected} from "../App";

const initialState = {
    messages: [],
    display: {
        selectedStyle: NoneSelected,
        unreadMessages: 0,
        showCompose: false
    }
}

export function messages(state = initialState, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            console.log(`reducer.MESSAGES_RECEIVED: state:`)
            console.dir(state)
            return action.messages

        default:
            return state
    }
}

export function display(state = initialState, action) {
    console.log(`-Reducer.display-action.type: ${action.type}`)
    switch (action.type) {
        case UNREAD_MESSAGES:
            console.log(`reducer.UNREAD_MESSAGES: state:`)
            console.dir(state)
            return {
                ...state,
                unreadMessages: action.unreadMessages
            }

        case INCREMENT_UNREAD_MESSAGES:
            console.log(`reducer.INCREMENT_UNREAD_MESSAGES: state:`)
            console.dir(state)
            return {
                ...state.display,
                unreadMessages: state.display.unreadMessages + 1
            }

        case SELECTED_STYLE:
            console.log(`reducer.SELECTED_STYLE: state:`)
            console.dir(state)
            return {
                ...state,
                selectedStyle: action.selectedStyle
            }

        case SHOW_COMPOSE:
            console.log(`reducer.SHOW_COMPOSE: state:`)
            console.dir(state)
            return {
                ...state,
                showCompose: !state.showCompose
            }

        default:
            return state
    }

}

// NOTE:  This added a level in state called "default" - ie, state.default.messages.messages...
// export default combineReducers({
//     messages,
//     unreadMessages
// })