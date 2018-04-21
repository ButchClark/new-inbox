import React, {Component} from 'react';
import './App.css';
import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
import {connect} from 'react-redux'
import ComposeMessage from './components/ComposeMessage'

export const AllSelected = 1
export const SomeSelected = 2
export const NoneSelected = 3

class App extends Component {
    constructor(props) {
        super(props)
        console.log('App.ctor(): props:')
        console.dir(props)
        this.messages = props.messages
        this.messageArray = props.messages.messages
        this.showCompose = props.showCompose

        console.log(' .. this.messageArray: ')
        console.dir(this.messageArray)
    }

    componentWillUpdate(nextProps, nextState) {
        this.messages = nextProps.messages
        this.messageArray = nextProps.messages.messages
        this.showCompose = nextProps.showCompose
        console.log('Component WILL UPDATE!');
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }


    render() {
        console.log('> App.render()... - this.messageArray:')
        console.dir(this.messageArray)
        return (
            <div className="App">
                <div>
                    <Toolbar/>
                </div>
                <div>
                    {this.showCompose && <ComposeMessage sendMessage={() => {
                        console.log('Compose Message component is being displayed')
                    }}/>}
                </div>
                <div>
                    <h3>Messages</h3>
                    {
                        this.messageArray === undefined
                            ? 'Loading...'
                            : <Messages messages={this.messageArray}/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('>App.mapStateToProps - state: ')
    console.dir(state)
    return {
        messages: state.messages,
        showCompose: state.messages.showCompose
    }
}

export default connect(
    mapStateToProps,
    null
)(App)
