import React, { Component } from 'react';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

export default class ChatBoxController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
            channelConnected: false,
            broadcastMessage: [],
            userList: []
        }
    }

    getUserList = () => {
      return this.state.userList;
    }

    componentDidMount() {
      this.props.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
      this.setState({
        channelConnected: true
      })
      if(this.props.stompClient.status === 'CONNECTED') {
        // Subscribing to the public topic
        this.props.stompClient.subscribe('/topic/public', this.onMessageReceived);
    
        // Registering user to server
        this.props.stompClient.send("/app/addUser",
          {},
          JSON.stringify({ sender: this.state.username, type: 'JOIN' })
        )
      }
    }

    onError = (error) => {
        console.error(error);
    }
    sendMessage = (type, value) => {
        if ( this.props.stompClient) {
            let chatMessage = {
              sender: this.state.username,
              content: type === 'TYPING' ? value : value,
              type: type      
            };
      
            this.props.stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      
            // clear message text box after sending the message
        }
    }


    onMessageReceived = (payload) => {
        let message = JSON.parse(payload.body);
        if (message.type === 'JOIN') {
            // TODO:
            this.state.userList.push(message.sender)
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
}
