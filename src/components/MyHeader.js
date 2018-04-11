import React from 'react'
import {connect} from 'react-redux'

const MyHeader = ({unreadMessages}) => {

    return (
        <div>
            <h1>UnreadMessages: {unreadMessages}</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    unreadMessages: state.unreadMessages
})

export default connect(
    mapStateToProps,
    null
)(MyHeader)