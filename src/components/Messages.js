import React from 'react'
import Message from './Message'
// import {connect} from 'react-redux'

const Messages = ({messages}) => {
    console.log("> Messages...")
    let response = "Loading..."
    if (messages=== undefined) {
        response = "Loading..."
    } else {
        if( Array.isArray(messages)) {
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
        }else{
            response = "dumping to sysout"
            console.log('`*** messages passed in is NOT an array...')
            console.dir(messages)
        }
    }
    return (
        <div>
            <div className='messages'>
                {response}
            </div>
        </div>
    )
}

// const mapStateToProps = state => {
//     console.log("Messages.mapStateToProps - state:")
//     console.dir(state)
//     return{
//         messages: state.messages.messages
//     }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
//     selectMessage: selectMessage()
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     null
// )(Messages)

export default Messages