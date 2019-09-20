import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'
import ChatBox from '../chatbox/ChatBoxSide'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticatedRoute extends Component {
    constructor() {
        super();
        this.state = {
            stompClient: null
        }
        this.connect();
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN");
                }
                return config
            }
        )
    }


    connect = () => {
        const Stomp = require('stompjs');
        let SockJS = require('sockjs-client');
        SockJS = new SockJS('http://localhost:8080/ws')
        this.setState({
            stompClient: Stomp.over(SockJS)
        });
    }


    componentWillMount() {
        this.setupAxiosInterceptors();
    }
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <div className="content-wrapper"><div className="main-content"><Route {...this.props} stompClient={this.state.stompClient}/></div><ChatBox /> </div>
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute