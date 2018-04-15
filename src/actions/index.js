export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const UNREAD_MESSAGES = 'UNREAD_MESSAGES'
export const SELECTED_STYLE = "SELECTED_STYLE"
export const SHOW_COMPOSE = "SHOW_COMPOSE"
export const SELECT_MESSAGE = "SELECT_MESSAGE"

export function getMessages() {
    console.log("> actions.getMessages()")
    return async (dispatch) => {
        const resp = await fetch('/api/messages')
        await console.log('after fetch(/api/messages')
        const json = await resp.json()
        // This becomes the "action" object in the reducer
        await console.log(`Got back messages: ${json}`)
        let unread = 0
        json._embedded.messages.forEach((m)=>{
            if(m.read === false){ unread += 1 }
        })
        await dispatch({
            type: UNREAD_MESSAGES,
            unreadMessages: unread
        })

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

export function selectMessage(messageId){
    console.log(`> actions.selectMessage( ${messageId} ) `)
    return async(dispatch) =>{
        console.log("calling dispatch now...")
        dispatch({
            type: SELECT_MESSAGE,
            messageId: messageId
        })
    }
}



