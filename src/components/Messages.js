import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'

const Messages = ({messages}) => {
    console.log(`>Messages - messages: `)
    console.dir(messages)

    let response = "Loading..."
    if (messages === undefined) {
        response = "Loading..."
    } else {
        response =
            messages.map(msg => {
                return <Message
                    key={msg.id}
                    message={msg}
                    starHandler={() => {
                        console.log('starHandler()')
                    }}
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

const mapStateToProps = state => {
    messages: state.messages
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     selectMessage: selectMessage()
// }, dispatch)

export default connect(
    mapStateToProps,
    null
)(Messages)