import React, { Component } from 'react';
import { ReactComponent as YourSvg } from './assets/close.svg';

export default class ChatModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            hide: false
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

    handleClose = () => {
        this.props.handleCloseUser(this.props.receiver);
    }

    handleToggle = () => {
        this.setState({hide: !this.state.hide});
    }
    render() {
        return (
        <div className="chatBox" style={this.state.hide ? {bottom: -330 + 'px'} : {}}>
            <div className="chatTitle" onClick={this.handleToggle}>
                {this.props.receiver}
                <div className="chatBox-right"> <a onClick={this.handleClose} className="closeBtn">
                    <YourSvg/> </a>
                </div>
            </div>
            
            <ul className="chatView" ref="messageBox">
            {this.props.broadcastMessage.map((msg, i) => 
                ( (msg.receiver == this.props.receiver && msg.sender == this.props.username) || 
                (msg.receiver == this.props.username && msg.sender == this.props.receiver)) ?
            <li key={i}> {(msg.sender == this.props.username) ? "You" : msg.sender} : {msg.message}</li> : null
            )}
            </ul>
            <div className="chatControl" ref="chatControl">
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
