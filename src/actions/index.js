import {AllSelected, NoneSelected, SomeSelected} from "../App";

export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const UNREAD_MESSAGES = 'UNREAD_MESSAGES'
export const SELECTED_STYLE = "SELECTED_STYLE"
export const SHOW_COMPOSE = "SHOW_COMPOSE"
export const SELECT_MESSAGE = "SELECT_MESSAGE"
export const SELECT_ALL_MESSAGES = "SELECT_ALL_MESSAGES"
export const DESELECT_ALL_MESSAGES = "DESELECT_ALL_MESSAGES"

export function getMessages() {
    console.log("> actions.getMessages()")
    return async (dispatch) => {
        const resp = await fetch('/api/messages')
        await console.log('after fetch(/api/messages')
        const json = await resp.json()
        // This becomes the "action" object in the reducer
        await console.log(`Got back messages: ${json}`)
        let unread = 0
        let numSelected = 0
        json._embedded.messages.forEach((m)=>{
            if(m.read === false){ unread += 1 }
            if(m.selected === true){ numSelected += 1}
        })
        await dispatch({
            type: UNREAD_MESSAGES,
            unreadMessages: unread
        })
        let selectionType = NoneSelected
        if(numSelected===0) {selectionType=NoneSelected}
        else if(numSelected === json._embedded.messages.length){ selectionType=AllSelected}
        else selectionType = SomeSelected
        await console.log(`getMessages - calling SELECTED_TYPE with: ${selectionType}`)
        await dispatch({
            type: SELECTED_STYLE,
            selectedStyle: selectionType
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
    return async (dispatch) => {
        dispatch({
            type: SHOW_COMPOSE
        })
    }
}

export function selectMessage(messageId){
    return async(dispatch) =>{

        await dispatch({
            type: SELECT_MESSAGE,
            messageId: messageId
        })
    }
}
export function selectAllMessages(){
    console.log("actions.selectAllMessages()")
    return async (dispatch) => {
        dispatch({
            type: SELECT_ALL_MESSAGES
        })
    }
}

export function deselectAllMessages(){
    console.log("actions.deselectAllMessages()")
    return async(dispatch) =>{
        dispatch({
            type: DESELECT_ALL_MESSAGES
        })
    }
}

export function deleteMessages(){
        console.log("> actions.deleteMessages()")
}



