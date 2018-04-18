import {
    DESELECT_ALL_MESSAGES,
    MARK_READ,
    MARK_UNREAD,
    MESSAGES_RECEIVED,
    SELECT_ALL_MESSAGES,
    SELECT_MESSAGE,
    SELECTED_STYLE,
    SHOW_COMPOSE,
    UNREAD_MESSAGES,
    setRead,
    setUnread
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
                (state.messages)
                    ? action.messages.forEach((m) => {
                        state.messages.forEach((s) => {
                            if (s.id === m.id) {
                                m.selected = s.selected
                            }
                        })
                    })
                    : action.messages
            return newMsgs

        case SELECT_MESSAGE:
            let newMessages = state.map(msg => {
                if (Number(msg.id) === Number(action.messageId)) {
                    if (!msg.selected || msg.selected === false) {
                        msg.selected = true
                    } else {
                        msg.selected = false
                    }
                }
                return msg
            })
            return newMessages

        case SELECT_ALL_MESSAGES:
            let newSelectAll = state.map(msg => {
                msg.selected = true
                return msg
            })
            return newSelectAll

        case DESELECT_ALL_MESSAGES:
            let newDeselectAll = state.map(msg => {
                msg.selected = false
                return msg
            })
            return newDeselectAll

        case MARK_READ:
            console.log("reducers.MARK_READ")
            console.dir(state)
            console.dir(messages)
            try {
                setRead(state)
            } catch (err) {
                console.log(`!!! setRead errored:  ${err}`)
            }
            return state

        case MARK_UNREAD:
            console.log("reducers.MARK_UNREAD")
            console.dir(state)
            console.dir(messages)
            try {
                setUnread(state)
            } catch (err) {
                console.log(`!!! setUnread errored:  ${err}`)
            }
            return state

        case MARK_UNREAD:
            console.log("reducers.MARK_UNREAD")
            return state

        default:
            return state
    }

}


export function display(state = initialState, action) {
    // console.log(`reducer.DISPLAY: action.type: ${action.type} - state, action`)
    switch (action.type) {
        case UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: action.unreadMessages
            }

        case SELECTED_STYLE:
            return {
                ...state,
                selectedStyle: action.selectedStyle
            }

        case SHOW_COMPOSE:
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