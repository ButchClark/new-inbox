import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllSelected, NoneSelected, SomeSelected} from "../App";
import {applyLabel, removeLabel, deleteMessages, selectMessages, toggleShowCompose, setMessagesRead,} from "../actions";

import {bindActionCreators} from 'redux'

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.messages = props.messages
        this.messageArray = props.messages.messages
        this.applyLabel = props.applyLabel
        this.removeLabel= props.removeLabel
        this.selectedStyle = NoneSelected
        this.unreadMessages = 0
        this.selectMessages = props.selectMessages
        this.showCompose = props.showCompose
        this.toggleShowCompose = props.toggleShowCompose
        this.deleteMessages = props.deleteMessages
        this.setMessagesRead = props.setMessagesRead
        // console.log(`> Toolbar.ctor - props:`)
        // console.dir(props)
        this.setDisplayProperties(this.messageArray)
    }

    componentWillReceiveProps = (nextProps) => {
        this.showCompose = nextProps.showCompose
        this.messageArray = nextProps.messages.messages
        this.setDisplayProperties(this.messageArray)
    }

    setDisplayProperties = (msgs) => {
        if (!msgs || msgs.length === 0) {
            this.unreadMessages = 0
            this.selectedStyle = NoneSelected
            return
        }
        let unreadCount = 0
        let selectedCount = 0
        msgs.forEach((m) => {
            if (m.selected === true) {
                selectedCount += 1
            }
            if (m.read !== true) {
                unreadCount += 1
            }
        })

        if (selectedCount === 0) {
            this.selectedStyle = NoneSelected
        } else if (selectedCount === msgs.length) {
            this.selectedStyle = AllSelected
        } else {
            this.selectedStyle = SomeSelected
        }
        this.unreadMessages = unreadCount
    }
    // handleSelectButton = () =>{
    //     console.log(`TOOLBAR.handleSelectButton() - selectedStyle: ${this.selectedStyle}`)
    //     if(this.selectedStyle === AllSelected){
    //         this.deselectAllMessages()
    //     }else{
    //         this.selectAllMessages()
    //     }
    // }

    handleMarkRead = async () => {
        await this.markMessagesRead()
        await console.log('handleMarkRead: after markMessagesRead()')
    }

    handleMarkUnread = async () => {
        await this.markMessagesUnread()
        await console.log('handleMarkUnread: after markMessagesUnread()')
    }

    handleDeleteMessages = async () => {
        await this.deleteMessages()
        await console.log('handleDeleteMessages: after deleteMessages()')
    }


    render() {
        let disableThem = false
        if (this.selectedStyle === NoneSelected) disableThem = true
        let selectedFormat = 'fa '
        if (this.selectedStyle === AllSelected) {
            selectedFormat += 'fa-check-square-o'
        }
        else if (this.selectedStyle === SomeSelected) {
            selectedFormat += 'fa-minus-square-o'
        } else if (this.selectedStyle === NoneSelected) {
            selectedFormat += 'fa-square-o'
        } else {
            console.log('!!! Toolbar got a weird value for selectedStyle: ', this.selectedStyle)
        }

        var markAsProps = {className: 'btn btn-default'}
        if (disableThem) markAsProps.disabled = true

        var selectProps = {className: 'form-control label-select'}
        if (disableThem) selectProps.disabled = true

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.unreadMessages}</span>
                        <i className="xxx">unread message{this.unreadMessages === 1 ? "" : "s"}</i>
                    </p>
                    <a className="btn btn-danger" onClick={this.toggleShowCompose}>
                        <i className="fa fa-plus"></i>
                    </a>
                    <button className="btn btn-default" onClick={this.selectMessages}>
                        <i className={selectedFormat}></i>
                    </button>

                    <button {...markAsProps} onClick={this.setMessagesRead}>Mark As Read</button>
                    <button {...markAsProps} onClick={this.handleMarkUnread}>Mark As Unread</button>

                    <select {...selectProps} onChange={(e) => {
                        this.applyLabel(e.currentTarget.value)
                    }}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select {...selectProps} onChange={(e) => {
                        this.removeLabel(e.currentTarget.value)
                    }}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button {...markAsProps} onClick={this.handleDeleteMessages}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('>Toolbar.mapStateToProps - state:')
    console.dir(state)
    return {
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShowCompose: toggleShowCompose,
    deleteMessages: deleteMessages,
    selectMessages: selectMessages,
    applyLabel: applyLabel,
    removeLabel: removeLabel,
    setMessagesRead: setMessagesRead
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)
