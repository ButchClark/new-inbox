import React from 'react'
import {connect} from 'react-redux'
import {AllSelected, SomeSelected, NoneSelected} from "../App";
import {INCREMENT_UNREAD_MESSAGES, toggleShowCompose} from "../actions";

const Toolbar = ({
                     selectedStyle,
                     unreadMessages,
                     toggleShowCompose
                 }) => {

    // console.log(`> Toolbar - unreadMessages: ${unreadMessages}`)
    // console.log(`> Toolbar - selectedStyle : ${selectedStyle}`)
    console.log(`> Toolbar - toggleShowCompose:`)
    console.dir(toggleShowCompose)

    const doToggle = (e) =>{
        console.log(" .. Toolbar.doToggle")
        console.dir(toggleShowCompose)
        toggleShowCompose()
        console.log(" .. Toolbar.doToggle - after calling toggleShowCompose()")
    }
    const handler = (e) => {
        console.log(`> Toolbar.handler - e: `)
        console.dir(e.target)
    }
    let disableThem = false

    if (selectedStyle === NoneSelected) disableThem = true

    let selectedFormat = 'fa '
    if (selectedStyle === AllSelected) {
        selectedFormat += 'fa-check-square-o'
    } else if (selectedStyle === SomeSelected) {
        selectedFormat += 'fa-minus-square-o'
    } else if (selectedStyle === NoneSelected) {
        selectedFormat += 'fa-square-o'
    } else {
        console.log('!!! Toolbar got a weird value for selectedStyle: ', selectedStyle)
    }

    var markAsProps = {className: 'btn btn-default'}
    if (disableThem) markAsProps.disabled = true

    var selectProps = {className: 'form-control label-select'}
    if (disableThem) selectProps.disabled = true


    selectedFormat = "fa fa-minus-square-o"
    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMessages}</span>
                    <i className="xxx">unread message{unreadMessages === 1 ? "" : "s"}</i>
                </p>
                <a className="btn btn-danger" onClick={doToggle} >
                    <i className="fa fa-plus"></i>
                </a>
                <button className="btn btn-default" onClick={(e) => {
                    handler(e)
                }}>
                    <i className={selectedFormat}></i>
                </button>

                <button {...markAsProps} onClick={(e) => {
                    handler(e)
                }}>Mark As Read
                </button>
                <button {...markAsProps} onClick={(e) => {
                    handler(e)
                }}>Mark As Unread
                </button>

                <select {...selectProps} onChange={(e) => {
                    handler(e)
                }}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select {...selectProps} onChange={(e) => {
                    handler(e)
                }}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button {...markAsProps} onClick={(e) => {
                    handler(e)
                }}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('>Toolbar.mapStateToProps - state:')
    console.dir(state)

    return {
        selectedStyle: state.display.selectedStyle,
        unreadMessages: state.display.unreadMessages
    }
}

const mapDispatchToProps = dispatch => ({
    toggleShowCompose: toggleShowCompose,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)