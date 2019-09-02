import React, { Component } from 'react';
import ChatBoxController from './ChatBoxController';

export default class ChatBoxSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChatBox: new ChatBoxController()
        }
    }

    componentDidMount() {
        this.state.ChatBox.connect();
    }

    render() {
        <div className="cbox-slide">
            
        </div>
    }
}
