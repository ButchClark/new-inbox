import {
    INCREMENT_UNREAD_MESSAGES,
    MESSAGES_RECEIVED,
    UNREAD_MESSAGES,
    SELECTED_STYLE
} from "../actions";
import {NoneSelected} from "../App";

const initialState = {
    messages: {
        messages: [],
        selectedStyle: NoneSelected
    },
    unreadMessages: 0
}

export function messages(state = initialState, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return action.messages

        case SELECTED_STYLE:
            return {
                ...state,
                messages: {
                    ...messages,
                    selectedStyle: action.selectedStyle
                }
            }
        default:
            return state
    }
}

export function unreadMessages(state = initialState, action) {
    switch (action.type) {
        case UNREAD_MESSAGES:
            return action.unreadMessages

        case INCREMENT_UNREAD_MESSAGES:
            return state.unreadMessages + 1

        default:
            return state
    }

}

// NOTE:  This added a level in state called "default" - ie, state.default.messages.messages...
// export default combineReducers({
//     messages,
//     unreadMessages
// })