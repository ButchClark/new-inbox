import React from 'react'
import Message from './Message'

const Messages = ({messages}) => {
    // console.log(`>Messages - messages.length: ${messages.length}`)
    return (
        <div>
            <div className='messages'>
                {
                    // messages.map(msg => {
                    //     return <Message
                    //         key={msg.id}
                    //         message={msg}
                    //     />
                    // })
                }
            </div>
        </div>
    )
}
export default Messages