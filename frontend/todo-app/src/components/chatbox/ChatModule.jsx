import React, { Component } from 'react';

export default class ChatModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: ""
        }
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.sendMessage('TYPING', event.target.value, this.state.receiver);

    };

    scrollToBottom = () => {
        var object = this.refs.messageBox;
        if (object)
          object.scrollTop = object.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleSendMessage = () => {
        this.props.sendMessage('CHAT', this.state.chatMessage, this.props.receiver);
        this.setState({ chatMessage: ''})
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.props.sendMessage('TYPING', event.target.value, this.props.receiver);

    };

    render() {
        return (
        <div className="chatBox" style={this.props.style}>
            <div className="chatTitle">
                {this.props.receiver}
                <div className="chatBox-right">
                    <input type="button" value="X"/>
                </div>
            </div>
            <ul className="chatView" ref="messageBox">
            {this.props.broadcastMessage.map((msg, i) => 
                ( (msg.receiver == this.props.receiver && msg.sender == this.props.username) || 
                (msg.receiver == this.props.username && msg.sender == this.props.receiver)) ?
            <li key={i}> {(msg.sender == this.props.username) ? "You" : msg.sender} : {msg.message}</li> : null
            )}
            </ul>
            <div className="chatControl">
                <input value={this.state.chatMessage} onChange={this.handleTyping} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleSendMessage();
                    }
                }}/>
                <input type="submit" value="Submit" onClick={this.handleSendMessage}/>
            </div>
        </div>);
    }
}
