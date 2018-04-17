import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllSelected, NoneSelected, SomeSelected} from "../App";
import {deleteMessages, toggleShowCompose, deselectAllMessages, selectAllMessages} from "../actions";
import {bindActionCreators} from 'redux'

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.messages = props.messages
        this.selectedStyle = props.selectedStyle
        this.showCompose = props.showCompose
        this.unreadMessages = props.unreadMessages
        this.toggleShowCompose = props.toggleShowCompose
        this.selectAllMessages = props.selectAllMessages
        this.deselectAllMessages = props.deselectAllMessages
        console.log(`> Toolbar.ctor - props:`)
        console.dir(props)
    }

    componentWillReceiveProps = (nextProps) =>{
        this.messages = nextProps.messages
        this.selectedStyle = nextProps.selectedStyle
        this.showCompose = nextProps.showCompose
        this.unreadMessages = nextProps.unreadMessages
    }

    handleSelectButton = () =>{
        console.log(`TOOLBAR.handleSelectButton() - selectedStyle: ${this.selectedStyle}`)
        if(this.selectedStyle === AllSelected){
            this.deselectAllMessages()
        }else{
            this.selectAllMessages()
        }
    }

    render() {
        const handler = (e) => {
            console.log(`> Toolbar.handler - e: `)
            console.dir(e.target)
        }

        let disableThem = false
        if (this.selectedStyle === NoneSelected ) disableThem = true
        let selectedFormat = 'fa '
        if (this.selectedStyle === AllSelected ) {
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
                    <button className="btn btn-default" onClick={this.handleSelectButton}>
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
}

const mapStateToProps = (state) => {
    console.log('>Toolbar.mapStateToProps - state:')
    console.dir(state)


    let selectedStyle = NoneSelected
    let selectedCount = 0
    if(state.messages) {
        state.messages.forEach((m) => {
            if (m.selected === true) {
                selectedCount += 1
            }
        })
        if (selectedCount === 0) {
            selectedStyle = NoneSelected
        }
        else if (selectedCount === state.messages.length) {
            selectedStyle = AllSelected
        }
        else {
            selectedStyle = SomeSelected
        }
    }

    return {
        unreadMessages: state.display.unreadMessages,
        messages: state.messages,
        selectedStyle: selectedStyle
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShowCompose: toggleShowCompose,
    deleteMessages: deleteMessages,
    selectAllMessages: selectAllMessages,
    deselectAllMessages: deselectAllMessages
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)
