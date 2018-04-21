export const FETCHING_MESSAGES = 'FETCHING_MESSAGES'
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGES_UPDATED = 'MESSAGES_UPDATED'
export const SELECTING_MESSAGE = 'SELECTING_MESSAGE'
export const MESSAGE_SELECTED = 'MESSAGE_SELECTED'
export const SELECTING_MESSAGES = 'SELECTING_MESSAGES'
export const MESSAGES_SELECTED = 'MESSAGES_SELECTED'
export const STARRING_MESSAGE = 'STARRING_MESSAGE'
export const MESSAGE_STARRED = 'MESSAGE_STARRED'
export const ADDING_MESSAGE = 'ADDING_MESSAGE'
export const MESSAGE_ADDED = 'MESSAGE_ADDED'
export const APPLYING_LABELS = 'APPLYING_LABELS'
export const LABELS_APPLIED = 'LABELS_APPLIED'
export const REMOVING_LABELS = 'REMOVING_LABELS'
export const LABELS_REMOVED = 'LABELS_REMOVED'
export const DELETING_MESSAGES = 'DELETING_MESSAGES'
export const MESSAGES_DELETED = 'MESSAGES_DELETED'
export const SHOW_COMPOSE = 'SHOW_COMPOSE'
export const HIDE_COMPOSE = 'HIDE_COMPOSE'


// export function updateMessages(msgs){
//     console.log("> actions.updateMessages(msgs)")
//     return async (dispatch) => {
//         let unread = 0
//         let numSelected = 0
//         msgs.forEach((m) => {
//             if (m.read === false) {
//                 unread += 1
//             }
//             if (m.selected === true) {
//                 numSelected += 1
//             }
//         })
//         await dispatch({
//             type: UNREAD_MESSAGES,
//             unreadMessages: unread
//         })
//         let selectionType = NoneSelected
//         if (numSelected === 0) {
//             selectionType = NoneSelected
//         }
//         else if (numSelected === msgs.length) {
//             selectionType = AllSelected
//         }
//         else selectionType = SomeSelected
//         await console.log(`updateMessages - calling SELECTED_TYPE with: ${selectionType}`)
//         await dispatch({
//             type: SELECTED_STYLE,
//             selectedStyle: selectionType
//         })
//
//         dispatch({
//                 type: MESSAGES_UPDATED,
//                 messages: msgs
//             }
//         )
//     }
// }

export function getMessages() {
    console.log("> actions.getMessages()")
    return async (dispatch) => {
        const resp = await fetch('/api/messages')
        await console.log('after fetch(/api/messages')
        const json = await resp.json()
        // This becomes the "action" object in the reducer
        await console.log(`Got back messages: ${json}`)
        await console.dir(json)
        dispatch({
                type: MESSAGES_RECEIVED,
                messages: json._embedded.messages
            }
        )
    }
}

// export function markMessagesRead() {
//     return async (dispatch) => {
//         await dispatch({
//             type: MARK_READ
//         })
//         getMessages()
//     }
// }
//
// export function markMessagesUnread() {
//     return async (dispatch) => {
//         await dispatch({
//             type: MARK_UNREAD
//         })
//         getMessages()
//     }
// }

export function deleteMessages() {
    return async (dispatch) => {
        await dispatch({
            type: DELETING_MESSAGES
        })
        // do stuff
        await dispatch({
            type: MESSAGES_DELETED
        })
    }
}

export function toggleShowCompose() {
    console.log('toggleShowCompose')
    return async (dispatch, getState) => {
        let showCompose = getState().messages.showCompose
        console.log(`--toggleShowCompose - showCompose: ${showCompose}`)
        if (showCompose === true) {
            dispatch({type: HIDE_COMPOSE})
        } else {
            dispatch({type: SHOW_COMPOSE})
        }
    }
}

export function selectMessages(){
    return async(dispatch,getState) =>{
        await dispatch({type: SELECTING_MESSAGES})
        let msgs = getState().messages.messages
        let selectedCount = 0
        msgs.forEach((m)=>{ if(m.selected === true){ selectedCount += 1} })
        if(selectedCount === msgs.length){
           // all currently selected, so deselect them all
           msgs.forEach((m) =>{ m.selected = false })
        }else{
            // some or none currently selected, so select them all
            msgs.forEach((m) =>{ m.selected = true })
        }
        await dispatch({type: MESSAGES_UPDATED, messages: msgs})
        await dispatch({type: MESSAGES_SELECTED})
    }
}

export function selectMessage(messageId) {
    return async (dispatch, getState) => {
        let msgs = []
        await dispatch({type: SELECTING_MESSAGE})
        msgs = getState().messages.messages
        await console.log(`actions.selectMessage() - messages`)
        await console.dir(msgs)
        msgs.forEach((m) => {
            if (Number(m.id) === Number(messageId)) {
                m.selected = !m.selected
            }
        })
        await console.log(` .. selecteMessage( ${messageId} - newMessages:`)
        await console.dir(msgs)
        await dispatch({
            type: MESSAGES_UPDATED,
            messages: msgs
        })
        await dispatch({type: MESSAGE_SELECTED})
    }
}

export function starMessage(messageId) {
    return async (dispatch, getState) => {
        let msgs = getState.messages
        await console.log(`actions.selectMessage() - messages`)
        await console.dir(msgs)
        await dispatch({
            type: STARRING_MESSAGE,
            messageId: messageId
        })
        msgs.forEach((m) => {
            if (Number(m.id) === Number(messageId)) {
                m.starred = !m.starred
            }
        })
        await dispatch({
            type: MESSAGES_UPDATED,
            messages: msgs
        })
        await dispatch({
            type: STARRING_MESSAGE,
            messageId: messageId
        })

    }
}

// export function selectAllMessages() {
//     return async (dispatch) => {
//
//         await dispatch({
//             type: SELECT_ALL_MESSAGES
//         })
//     }
// }

// export function deselectAllMessages() {
//     console.log("actions.deselectAllMessages()")
//     return async (dispatch) => {
//         dispatch({
//             type: DESELECT_ALL_MESSAGES
//         })
//     }
// }

export function executeDeleteMessages(messages) {
    if (!messages || messages.length === 0) {
        return []
    }

    let messageIds = []
    messages.forEach((m) => {
        if (m.selected === true) {
            messageIds.push(m.id)
        }
    })
    console.log(`messageIds: ${messageIds}`)
    const callPatch = async (messageIds) => {

        let theBody = JSON.stringify(
            {
                messageIds,
                command: "delete"
            }
        )

        console.log("PATCH (for delete) Body to be sent:")
        console.log(theBody)

        try {
            const response = await fetch(`/api/messages`, {
                method: 'PATCH',
                body: theBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            await console.log(`response from PATCH call: ${response}`)
        } catch (err) {
            console.log(`!! Error from PATCH call: ${err}`)
        }
    }
    callPatch(messageIds)
    console.log('after callPatch()')
}

export function setRead(messages) {
    if (!messages || messages.length === 0) {
        return []
    }

    let messageIds = []
    messages.forEach((m) => {
        if (m.selected === true) {
            messageIds.push(m.id)
        }
    })
    console.log(`messageIds: ${messageIds}`)
    const callPatch = async (messageIds) => {

        let theBody = JSON.stringify(
            {
                messageIds,
                command: "read",
                read: true
            }
        )

        console.log("PATCH Body to be sent:")
        console.log(theBody)

        try {
            const response = await fetch(`/api/messages`, {
                method: 'PATCH',
                body: theBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            await console.log(`response from PATCH call: ${response}`)
        } catch (err) {
            console.log(`!! Error from PATCH call: ${err}`)
        }
    }
    callPatch(messageIds)
    console.log('after callPatch()')
}

export function setUnread(messages) {
    if (!messages || messages.length === 0) {
        return []
    }

    let messageIds = []
    messages.forEach((m) => {
        if (m.selected === true) {
            messageIds.push(m.id)
        }
    })
    console.log(`messageIds: ${messageIds}`)
    const callPatch = async (messageIds) => {

        let theBody = JSON.stringify(
            {
                messageIds,
                command: "read",
                read: false
            }
        )

        console.log("PATCH Body to be sent:")
        console.log(theBody)

        try {
            const response = await fetch(`/api/messages`, {
                method: 'PATCH',
                body: theBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            await console.log(`response from PATCH call: ${response}`)
        } catch (err) {
            console.log(`!! Error from PATCH call: ${err}`)
        }
    }
    callPatch(messageIds)
    console.log('after callPatch()')
}
