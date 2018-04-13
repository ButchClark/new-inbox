export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const UNREAD_MESSAGES = 'UNREAD_MESSAGES'
export const INCREMENT_UNREAD_MESSAGES = 'INCREMENT_UNREAD_MESSAGES'
export const SELECTED_STYLE = "SELECTED_STYLE"
export const SHOW_COMPOSE = "SHOW_COMPOSE"

export function getMessages() {
    console.log("> actions.getMessages()")
    return async (dispatch) => {
        const resp = await fetch('/api/messages')
        await console.log('after fetch(/api/messages')
        const json = await resp.json()
        // This becomes the "action" object in the reducer
        await console.log(`Got back messages: ${json}`)
        dispatch({
                type: MESSAGES_RECEIVED,
                messages: json._embedded.messages
            }
        )
    }
}

export function unreadMessageCount(howMany){
    console.log(`> actions.setUnreadMessages for numOfMsgs: ${howMany}`)

    return async (dispatch) => {
        dispatch({
            type: UNREAD_MESSAGES,
            unreadMessages: howMany
        })
    }
}

export function setSelectedStyle(style){
    console.log(`> actions.setSelectedStyle for style: ${style}`)

    return async (dispatch) => {
        dispatch({
            type: SELECTED_STYLE,
            selectedStyle: style
        })
    }
}

export function toggleShowCompose(){
    console.log(`> actions.toggleShowCompose`)

    return async (dispatch) => {
        dispatch({
            type: SHOW_COMPOSE
        })
    }
}



