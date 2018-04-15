import {MESSAGES_RECEIVED, SELECT_MESSAGE, SELECTED_STYLE, SHOW_COMPOSE, UNREAD_MESSAGES} from "../actions";
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
    console.log(`reducer.MESSAGES_RECEIVED: action.type: ${action.type} - state, action`)
    console.dir(state)
    console.dir(action)
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return action.messages
        case SELECT_MESSAGE:
            let newMessages = state.map(msg => {
                console.log(`SELECT_MSG: action.messageId: ${action.messageId}, msg.id: ${msg.id}`)
                if (Number(msg.id) === Number(action.messageId)) {
                    if (!msg.selected || msg.selected === false) {
                        msg.selected = true
                    } else {
                        msg.selected = false
                    }
                }
                return msg
            })
            console.log(`reducer.MESSAGES_RECEIVED: newMessages:`)
            console.dir(newMessages)
            return newMessages

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