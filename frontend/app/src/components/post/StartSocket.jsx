import React, { Component } from 'react'

export default class StartSocket extends Component {
    static connect = () => {
        const Stomp = require('stompjs');
        let SockJS = require('sockjs-client');
        SockJS = new SockJS('https://rmitsocial-back.herokuapp.com/ws')
        return Stomp.over(SockJS);
    }
}
