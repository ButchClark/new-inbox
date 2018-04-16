import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllSelected, NoneSelected, SomeSelected} from "../App";
import {deleteMessages, toggleShowCompose} from "../actions";
import {bindActionCreators} from 'redux'

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.messages = props.messages
        this.selectedStyle = NoneSelected
        this.unreadMessages = props.unreadMessages
        this.toggleShowCompose = props.toggleShowCompose
        console.log(`> Toolbar.ctor - unreadMessages: ${this.unreadMessages}`)
        console.log(`> Toolbar.ctor - selectedStyle : ${this.selectedStyle}`)
    }

    render() {
        const getSelectedStyle = () =>{
            let selectedCount = 0
            let selectedStyle = NoneSelected
            this.messages.forEach((m)=>{
                if(m.selected === true){
                    selectedCount += 1
                }
            })
            if(selectedCount===0){ selectedStyle = NoneSelected}
            else if(selectedCount === this.messages.length){ selectedStyle=AllSelected}
            else {selectedStyle = SomeSelected}
            return selectedStyle
        }

        const handler = (e) => {
            console.log(`> Toolbar.handler - e: `)
            console.dir(e.target)
        }
        // see how many messages are selected
        this.selectedStyle = getSelectedStyle()

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
                    <a className="btn btn-danger" onClick={toggleShowCompose}>
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
}

const mapStateToProps = (state) => {
    console.log('>Toolbar.mapStateToProps - state:')
    console.dir(state)

    return {
        unreadMessages: state.display.unreadMessages,
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShowCompose: toggleShowCompose,
    deleteMessages: deleteMessages
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)