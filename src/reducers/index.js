import {
    DELETING_MESSAGES,
    HIDE_COMPOSE,
    MESSAGE_SELECTED,
    MESSAGES_DELETED,
    MESSAGES_RECEIVED,
    MESSAGES_SELECTED,
    MESSAGES_UPDATED,
    SELECTING_MESSAGE,
    SELECTING_MESSAGES,
    SHOW_COMPOSE
} from "../actions";

const initialState = {
    messages: {
        messages: [],
        showCompose: false,
        starringMessage: false,
        addingMessage: false,
        applyingLabels: false,
        removingLabels: false,
        selectingMessage: false,
        selectingMessages: false
    }
}

export function messages(state = initialState, action) {
    // console.log(`reducer.MESSAGES: action.type: ${action.type} - state, action`)
    // console.dir(state)
    // console.dir(action)
    switch (action.type) {
        case MESSAGES_RECEIVED:
            console.log('MESSAGES_RECEIVED')
            console.dir(state)
            console.dir(action)
            // Need to set Selected before returning
            let newMsgs =
                (state.messages.messages)
                    ? action.messages.forEach((m) => {
                        state.messages.messages.forEach((s) => {
                            if (s.id === m.id) {
                                m.selected = s.selected
                            }
                        })
                    })
                    : action.messages
            return {
                ...state,
                messages: newMsgs
            }

        case MESSAGES_UPDATED:
            console.log(`MESSAGES_UPDATED`)
            return {
                ...state,
                messages: action.messages
            }

        case SELECTING_MESSAGE:
            return {
                ...state,
                selectingMessage: true
            }

        case MESSAGE_SELECTED:
            return {
                ...state,
                selectingMessage: false
            }

        // case MARK_READ:
        //     console.log("reducers.MARK_READ")
        //     console.dir(state)
        //     console.dir(messages)
        //     try {
        //         setRead(state)
        //     } catch (err) {
        //         console.log(`!!! setRead errored:  ${err}`)
        //     }
        //     return state

        case DELETING_MESSAGES:
            return {
                ...state,
                deletingMessages: true
            }
        case MESSAGES_DELETED:
            return {
                ...state,
                deletingMessages: false
            }

        //
        // case MARK_UNREAD:
        //     console.log("reducers.MARK_UNREAD")
        //     console.dir(state)
        //     console.dir(messages)
        //     try {
        //         setUnread(state)
        //     } catch (err) {
        //         console.log(`!!! setUnread errored:  ${err}`)
        //     }
        //     return state
        case SHOW_COMPOSE:
            return {
                ...state,
                showCompose: true
            }
        case HIDE_COMPOSE:
            return {
                ...state,
                showCompose: false
            }
        case SELECTING_MESSAGES:
            return {
                ...state,
                selectingMessages: true
            }
        case MESSAGES_SELECTED:
            return {
                ...state,
                selectingMessages: false
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