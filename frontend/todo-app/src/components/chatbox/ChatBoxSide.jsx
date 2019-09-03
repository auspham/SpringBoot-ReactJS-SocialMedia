import React, { Component } from 'react';
import './chatbox.scss';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

var stompClient = null;
var sessionId = null;

export default class ChatBoxSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
            channelConnected: false,
            broadcastMessage: [],
            userList: [],
            receiver: ""
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

        let url = stompClient.ws._transport.url;
        url = url.replace("ws://localhost:8080/ws",  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);

        sessionId = url;

        console.log('stomp', stompClient);
        // Subscribing to the public topic
        stompClient.subscribe('/topic/public', this.onMessageReceived);
        stompClient.subscribe('/topic/getUser', this.onRefreshUserList);
        stompClient.subscribe('/queue/specific-user', (msg) => {
            console.log('msg', msg);
        });
        // Registering user to server
        stompClient.send("/app/addUser",
        {},
        JSON.stringify({ sender: this.state.username, type: 'JOIN' })
        )

        stompClient.send("/app/getUserlist", {}, this.state.username);


    }

    onError = (error) => {
       console.error(error);
    }

    onRefreshUserList = (payload) => {
        let users = JSON.parse(payload.body);
        this.setState(prevState => ({
            userList: users
        }), );
    }

    sendMessage = (type, value, receiver) => {
        if (stompClient) {
            let chatMessage = {
              sender: this.state.username,
              content: type === 'TYPING' ? value : value,
              type: type,
              receiver: receiver  
            };
      
            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      
            // clear message text box after sending the message
        }
    }

    scrollToBottom = () => {
        var object = this.refs.messageBox;
        if (object)
          object.scrollTop = object.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onMessageReceived = (payload) => {
        let message = JSON.parse(payload.body);
        console.log("onReceived", message)
        if (message.type === 'JOIN') {
            // if(!this.state.userList.includes(message.sender)) {
            //     this.setState(prevState => ({
            //         userList: [...prevState.userList, message.sender]
            //     }), );
            // }
        }
        else if (message.type === 'LEAVE') {     
            stompClient.send("/app/getUserlist", {}, this.state.username);
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
        this.sendMessage('CHAT', this.state.chatMessage, this.state.receiver);
        
        this.setState({ chatMessage: ''})
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.sendMessage('TYPING', event.target.value, this.state.receiver);

    };

    handleSelectUser = (event) => {
        this.setState({ receiver: event.target.innerText }, 
            console.log("sending to" + this.state.receiver));
    }
    render() {
        return(
            <div>
                <div className="cbox-slide">
                    {Array.from(this.state.userList).map((user, i) => <div key={i} className="card user-holder" onClick={this.handleSelectUser}>
                        {user}
                    </div>)}
                </div>
                <div className="chatBox">
                    <div className="chatTitle">
                        {this.state.receiver}
                        <div className="chatBox-right">
                            <input type="button" value="X"/>
                        </div>
                    </div>
                    <ul className="chatView" ref="messageBox">
                    {this.state.broadcastMessage.map((msg, i) => 
                            <li key={i}>{msg.sender}: {msg.message}</li>
                    )}
                    </ul>
                    <div className="chatControl">
                        <input value={this.state.chatMessage} onChange={this.handleTyping}/>
                        <input type="submit" value="Submit" onClick={this.handleSendMessage}/>
                    </div>
                </div>
            </div>);
    }
}
