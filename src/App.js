import React, {Component} from 'react';
import './App.css';
import MyHeader from './components/MyHeader'
import Messages from './components/Messages'
import {connect} from 'react-redux'

export const AllSelected = 1
export const SomeSelected = 2
export const NoneSelected = 3

class App extends Component {
    constructor(props) {
        super(props)
        this.messages = props.messages
        this.unreadMessages = props.unreadMessages
        console.log('App.ctor(): props:')
        console.dir(props)
    }

    render() {
        return (
            <div className="App">
                <div>
                    <MyHeader/>
                </div>
                <div>
                    ComposeMessage here...
                </div>
                <div>
                    <h3>Messages</h3>
                    {
                        this.messages===undefined
                            ? 'Loading...'
                            : <Messages messages={this.messages}/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.default.messages,
    unreadMessages: state.default.unreadMessages
})

export default connect(
    mapStateToProps,
    null
)(App)
