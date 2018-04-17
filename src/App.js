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
        this.showCompose = props.display.showCompose
    }

    componentWillReceiveProps = (nextProps) =>{
        this.showCompose = nextProps.display.showCompose
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Toolbar/>
                </div>
                <div>
                    {this.showCompose && <ComposeMessage sendMessage={() => {
                        console.log('add message')
                    }}/>}
                </div>
                <div>
                    <h3>Messages</h3>
                    {
                        this.props.messages === undefined
                            ? 'Loading...'
                            : <Messages messages={this.props.messages}/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log('>App.mapStateToProps - state: ')
    // console.dir(state)
    return {
        messages: state.messages,
        display: state.display
    }
}

export default connect(
    mapStateToProps,
    null
)(App)
