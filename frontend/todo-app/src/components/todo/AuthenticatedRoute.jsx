import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticatedRoute extends Component {
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
    componentWillMount() {
        this.setupAxiosInterceptors();
    }
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute