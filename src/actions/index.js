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
export const APPLYING_LABEL = 'APPLYING_LABEL'
export const LABEL_APPLIED = 'LABEL_APPLIED'
export const REMOVING_LABEL = 'REMOVING_LABEL'
export const LABEL_REMOVED = 'LABEL_REMOVED'
export const DELETING_MESSAGES = 'DELETING_MESSAGES'
export const MESSAGES_DELETED = 'MESSAGES_DELETED'
export const SHOW_COMPOSE = 'SHOW_COMPOSE'
export const HIDE_COMPOSE = 'HIDE_COMPOSE'
export const SETTING_MESSAGES_TO_READ = "SETTING_MESSAGES_TO_READ"
export const MESSAGES_SET_TO_READ = "MESSAGES_SET_TO_READ"
export const SETTING_MESSAGES_TO_UNREAD = "SETTING_MESSAGES_TO_UNREAD"
export const MESSAGES_SET_TO_UNREAD = "MESSAGES_SET_TO_UNREAD"

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
export function addMessage(message) {
    console.log(` actions.addMessage for message: ${JSON.stringify(message)}`)
    return async (dispatch) => {
        await dispatch({type: ADDING_MESSAGE})
        const doFetch = async(theBody) =>{
            await console.log(` addMessage.doFetch with body: ${JSON.stringify(theBody)}`)
            try {
                const response = await fetch(`/api/messages`, {
                    method: 'POST',
                    body: JSON.stringify(theBody),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                await console.log(`response from POST call: ${JSON.stringify(response)}`)
            } catch (err) {
                console.log(`!! Error from POST call: ${err}`)
            }
        }
        await doFetch(message)
        getMessages()
        await dispatch({type: MESSAGE_ADDED})
    }
}

export function deleteMessages() {
    return async (dispatch, getState) => {
        await dispatch({
            type: DELETING_MESSAGES
        })
        const doFetch = async (theBody) => {
            await console.log(` deleteMessages.doFetch with body: ${JSON.stringify(theBody)}`)
            try {
                const response = await
                    fetch(`/api/messages`, {
                        method: 'PATCH',
                        body: JSON.stringify(theBody),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                await console.log(`response from PATCH call: ${JSON.stringify(response)}`)
            } catch (err) {
                console.log(`!! Error from PATCH call: ${err}`)
            }
        }
        // do deletes here
        let msgs = getState().messages.messages
        let selectedMsgIds = []
        let selectedMsgIndexes = []
        msgs.forEach((m, index) => {
            if (m.selected === true) {
                selectedMsgIds.push(m.id)
                selectedMsgIndexes.push(index)
            }
        })
        // Remove all selected Msgs from array
        selectedMsgIndexes = selectedMsgIndexes.sort((a, b) => b - a)
        selectedMsgIndexes.forEach((indx) => {
            msgs.splice(indx, 1)
        })
        await console.log("msgs after array splice:")
        await console.dir(msgs)

        // Now send to API server for removal
        let theBody = {
            messageIds: selectedMsgIds,
            command: "delete"
        }
        await doFetch(theBody)

        await dispatch({
            type: MESSAGES_UPDATED,
            messages: msgs
        })
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

export function selectMessages() {
    return async (dispatch, getState) => {
        await dispatch({type: SELECTING_MESSAGES})
        let msgs = getState().messages.messages
        let selectedCount = 0
        msgs.forEach((m) => {
            if (m.selected === true) {
                selectedCount += 1
            }
        })
        if (selectedCount === msgs.length) {
            // all currently selected, so deselect them all
            msgs.forEach((m) => {
                m.selected = false
            })
        } else {
            // some or none currently selected, so select them all
            msgs.forEach((m) => {
                m.selected = true
            })
        }
        await dispatch({type: MESSAGES_UPDATED, messages: msgs})
        await dispatch({type: MESSAGES_SELECTED})
    }
}

export function applyLabel(label) {
    console.log(`actions.ApplyLabels( ${label} )`)
    if (!label || label === "Apply label") {
        return async () => {
            await console.log(' .. Returning because no label sent in')
        }
    }

    return async (dispatch, getState) => {
        await dispatch({type: APPLYING_LABEL})
        const doFetch = async (theBody) => {
            await console.log(` applyLabels.doFetch with body: ${theBody}`)
            try {
                const response = await
                    fetch(`/api/messages`, {
                        method: 'PATCH',
                        body: theBody,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                await console.log(`response from PATCH call: ${JSON.stringify(response)}`)
            } catch (err) {
                console.log(`!! Error from PATCH call: ${err}`)
            }
        }

        let msgs = getState().messages.messages
        msgs.forEach(async (msg) => {
            if (msg.selected === true) {
                // await console.log(`message id: ${msg.id} - msg.labels, labels: `)
                // await console.dir(msg.labels)
                // await console.dir(label)
                //apply labels to this guy
                if (!msg.labels.includes(label)) {
                    msg.labels.push(label)
                    // Now PATCH it on the API server
                    let theBody = JSON.stringify({
                        messageIds: [msg.id],
                        command: "addLabel",
                        label: label
                    })
                    await doFetch(theBody)
                }
            }
        })
        await console.log(`calling MESSAGES_UPDATED with msgs: ${JSON.stringify(msgs)}`)
        await dispatch({type: MESSAGES_UPDATED, messages: msgs})
        await dispatch({type: LABEL_APPLIED})
    }
}

export function removeLabel(label) {
    console.log(`actions.ApplyLabels( ${label} )`)
    if (!label || label === "Remove label") {
        return async () => {
            await console.log(' .. Returning because no label sent in')
        }
    }

    return async (dispatch, getState) => {
        await dispatch({type: REMOVING_LABEL})
        const doFetch = async (theBody) => {
            await console.log(` removeLabel.doFetch with body: ${theBody}`)
            try {
                const response = await
                    fetch(`/api/messages`, {
                        method: 'PATCH',
                        body: theBody,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                await console.log(`response from PATCH call: ${JSON.stringify(response)}`)
            } catch (err) {
                console.log(`!! Error from PATCH call: ${err}`)
            }
        }

        let msgs = getState().messages.messages
        msgs.forEach(async (msg) => {
            if (msg.selected === true) {
                // await console.log(`message id: ${msg.id} - msg.labels, labels: `)
                // await console.dir(msg.labels)
                // await console.dir(label)
                //apply labels to this guy
                if (msg.labels.includes(label)) {
                    let indx = msg.labels.indexOf(label)
                    if (indx > -1) {
                        msg.labels.splice(indx, 1)
                        // Now PATCH it on the API server
                        let theBody = JSON.stringify({
                            messageIds: [msg.id],
                            command: "removeLabel",
                            label: label
                        })
                        await doFetch(theBody)
                    }
                }
            }
        })
        await console.log(`calling MESSAGES_UPDATED with msgs: ${JSON.stringify(msgs)}`)
        await dispatch({type: MESSAGES_UPDATED, messages: msgs})
        await dispatch({type: LABEL_REMOVED})
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
export function setMessagesRead(){
    return async (dispatch,getState) => {
        await dispatch({type: SETTING_MESSAGES_TO_READ})
        let msgs = getState().messages.messages

        const doFetch = async (theBody) => {
            await console.log(` setMessagesRead.doFetch with body: ${JSON.stringify(theBody)}`)
            try {
                const response = await
                    fetch(`/api/messages`, {
                        method: 'PATCH',
                        body: JSON.stringify(theBody),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }
                    })
                await console.log(`response from PATCH call: ${JSON.stringify(response)}`)
            } catch (err) {
                console.log(`!! Error from PATCH call: ${err}`)
            }
        }
        let selectedMsgIds = []
        msgs.forEach(async(msg)=>{
            if(msg.selected===true){
                msg.read = true
                selectedMsgIds.push(msg.id)
            }
        })

        let theBody = {
            messageIds: selectedMsgIds,
            command: "delete"
        }
        await doFetch(theBody)
        await dispatch({type: MESSAGES_UPDATED, messages: msgs})
        await dispatch({type: MESSAGES_SET_TO_READ})
    }
}
export function starMessage(messageId) {
    if( !messageId){
        console.log("!!!! starMessage() - received undefined messageId")
    }
    return async (dispatch, getState) => {
        let msgs = getState().messages.messages
        await console.log(`actions.starMessage() - messages`)
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
            type: MESSAGE_STARRED,
            messageId: messageId
        })

    }
}

