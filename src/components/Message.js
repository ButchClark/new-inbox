import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {selectMessage} from "../actions";

const starClickHandler = (e, upstreamHandler) => {
    e.preventDefault()
    if(!upstreamHandler){
        console.log("Message.starClickHandler: upstreamHandler is NULL/empty")
    }

    // ------------------------------------------
    // sending data on the event object.
    // Accessed as:  e.target.dataset.myvarname
    // Set like this on a component:
    //   <Thing data-myvarname="XYZ" ...
    // ------------------------------------------
    console.log(`Message.starClickHandler for msg: ${e.target.dataset.messagenum}`)
    console.log('Calling upstreamHandler()')
    upstreamHandler(e.target.dataset.messagenum)
    console.log(`After calling upstreamHandler`)

}

const Message = ({message, selectMessage, starHandler}) => {
    let rowFormat = "row message "
    rowFormat += message.read ? "read " : "unread "
    rowFormat += message.selected ? "selected " : ""
    let checkedStatus = message.selected === true ? "checked" : ""
    let msgstarred = message.starred ? "star fa fa-star" : "star fa fa-star-o"

    return (
        <div className={rowFormat}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input
                            name="selectCheckbox"
                            value={message.id}
                            type="checkbox"
                            onChange={(e)=>{selectMessage(e.currentTarget.value)}}
                            checked={checkedStatus}/>
                    </div>
                    <div className="col-xs-2">
                        <i name="star"
                           data-messagenum={message.id}
                           data-msg="MyMsg"
                           value={message.id}
                           onClick={(e) => {
                               starClickHandler(e, starHandler)
                           }}
                           className={msgstarred}/>
                    </div>
                </div>
            </div>

            <div>
                <div className="col-xs-11">
                    {message.labels.map((lbl, id) => {
                        return <span key={id} className="label label-warning">{lbl}</span>
                    })}
                    {message.subject}
                </div>
            </div>
        </div>
    )

}

const mapDispatchToProps = dispatch => bindActionCreators({
    selectMessage: selectMessage
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Message)