import React, { Component } from 'react';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

var stompClient = null;

export default class ChatBoxBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
            channelConnected: false,
            broadcastMessage: [],
        }
        this.connect();
    }

    connect = () => {
        const Stomp = require('stompjs');
        let SockJS = require('sockjs-client');
        SockJS = new SockJS('http://localhost:8080/ws')
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {

        this.setState({
          channelConnected: true
        })
    
        // Subscribing to the public topic
        stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Registering user to server
        stompClient.send("/app/addUser",
          {},
          JSON.stringify({ sender: this.state.username, type: 'JOIN' })
        )

    }

    onError = (error) => {
       console.error(error);
    }

    sendMessage = (type, value) => {
        if (stompClient) {
            let chatMessage = {
              sender: this.state.username,
              content: type === 'TYPING' ? value : value,
              type: type      
            };
      
            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      
            // clear message text box after sending the message
        }
    }


    onMessageReceived = (payload) => {
        let message = JSON.parse(payload.body);
    
        if (message.type === 'JOIN') {
            // TODO:
        }
        else if (message.type === 'LEAVE') {     
            // TODO:
        }
        else if (message.type === 'TYPING') {
            // TODO:
        }
        else if (message.type === 'CHAT') {
          this.state.broadcastMessage.push({
            message: message.content,
            sender: message.sender,
            dateTime: message.dateTime
          })
          this.setState({
            broadcastMessage: this.state.broadcastMessage,
          })
        }
        else {
          // do nothing...
        }
    }

    handleSendMessage = () => {

        this.sendMessage('CHAT', this.state.chatMessage)

            this.setState({
              chatMessage: ''
            })
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.sendMessage('TYPING', event.target.value);

    };

    render() {
      return(
          <div className="chatBox">
              <ul className="chatView">
                {this.state.broadcastMessage.map((msg, i) => 
                        <li key={i}>{msg.sender}: {msg.message}</li>
                )}
              </ul>
              <input value={this.state.chatMessage} onChange={this.handleTyping}/>
              <input type="submit" value="Submit" onClick={this.handleSendMessage}/>
      </div>);
    }

}