import React from 'react'
import {connect} from 'react-redux'

const MyHeader = ({unreadMessages}) => {
console.log('MyHeader> unreadMessages', unreadMessages)
    return (
        <div>
            <h1>UnreadMessages: {unreadMessages}</h1>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(`MyHeader.mapStateToProps: ${state}`)
    debugger
    return {
    unreadMessages: state.default.unreadMessages
}}

export default connect(
    mapStateToProps,
    null
)(MyHeader)