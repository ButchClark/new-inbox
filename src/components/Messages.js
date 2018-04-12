import React from 'react'
import Message from './Message'

const Messages = ({messages}) => {
    console.log(`>Messages - selectedStyle: ${messages.selectedStyle}`)
    console.log(`>Messages - messages.selectedStyle: ${messages.messages.selectedStyle}`)
    console.log(`>Messages - messages: `)
    console.dir(messages)

    let response = "Loading..."
    if (messages.messages.messages === undefined) {
        response = "Loading..."
    } else {
        response =
            messages.messages.map(msg => {
                return <Message
                    key={msg.id}
                    message={msg}
                />
            })
    }
    return (
        <div>
            <div className='messages'>
                {response}
            </div>
        </div>
    )
}
export default Messages