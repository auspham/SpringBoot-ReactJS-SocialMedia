import React, { Component } from 'react';

export default class ChatModule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="chatBox">
            <div className="chatTitle">
                {this.props.receiver}
                <div className="chatBox-right">
                    <input type="button" value="X"/>
                </div>
            </div>
            <ul className="chatView" ref="messageBox">
            {this.props.broadcastMessage.map((msg, i) => 
                    <li key={i}>{msg.sender}: {msg.message}</li>
            )}
            </ul>
            <div className="chatControl">
                <input value={this.props.chatMessage} onChange={this.props.handleTyping}/>
                <input type="submit" value="Submit" onClick={this.props.handleSendMessage}/>
            </div>
        </div>);
    }
}
