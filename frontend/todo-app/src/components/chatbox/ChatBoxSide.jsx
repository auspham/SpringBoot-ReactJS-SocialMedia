import React, { Component } from 'react';
import './chatbox.scss';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

var stompClient = null;

export default class ChatBoxSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
            channelConnected: false,
            broadcastMessage: [],
            userList: []
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

    getUserList = () => {
      return this.state.userList;
    }

    onConnected = () => {

        this.setState({
          channelConnected: true
        })
        console.log('stomp', stompClient);
        // Subscribing to the public topic
        stompClient.subscribe('/topic/public', this.onMessageReceived);
        // stompClient.subscribe('/topic/getUser', this.onMessageReceived);

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
        console.log('message payload', message);
        if (message.type === 'JOIN') {
            if(!this.state.userList.includes(message.sender)) {
                this.setState(prevState => ({
                    userList: [...prevState.userList, message.sender]
                }), );
            }
        }
        else if (message.type === 'LEAVE') {     
            if(this.state.userList.includes(message.sender)) {
                this.setState(prevState => ({
                    userList: prevState.userList.filter(user => user != message.sender)
                }), );
            }
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
            <div className="cbox-slide">
                {Array.from(this.state.userList).map((user, i) => <div key={i} className="card user-holder">
                    {user}
                </div>)}
            </div>);
    }
}
