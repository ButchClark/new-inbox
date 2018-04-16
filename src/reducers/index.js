import {MESSAGES_RECEIVED, SELECT_MESSAGE, SELECTED_STYLE, SHOW_COMPOSE, UNREAD_MESSAGES} from "../actions";
import {AllSelected, NoneSelected, SomeSelected} from "../App";

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
                if (Number(msg.id) === Number(action.messageId)) {
                    if (!msg.selected || msg.selected === false) {
                        msg.selected = true
                    } else {
                        msg.selected = false
                    }
                }
                return msg
            })

            let selectedStyle = NoneSelected
            let selectedCount = 0
            if(newMessages) {
                console.log(` .. there are ${newMessages.length} state.messages`)
                newMessages.forEach((m) => {
                    if (m.selected === true) {
                        selectedCount += 1
                    }
                })
                if (selectedCount === 0) {
                    selectedStyle = NoneSelected
                }
                else if (selectedCount === newMessages.length) {
                    selectedStyle = AllSelected
                }
                else {
                    selectedStyle = SomeSelected
                }
                console.log(` .. there are ${selectedCount} selected messages`)
            }

            return newMessages

        default:
            return state
    }
}

export function display(state = initialState, action) {
    switch (action.type) {
        case UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: action.unreadMessages
            }

        case SELECTED_STYLE:
            console.log("> SELECTED_STYLE")

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