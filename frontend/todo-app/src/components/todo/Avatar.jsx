import React, { Component } from 'react'
import Guest from "../profilewall/assets/guest.jpeg"
import {API_URL} from '../../Constants'
export default class Avatar extends Component {

    handleError = (e) => {
        e.target.src = Guest;
    }

    render() {
        return <div className="cmt-avatar">
            <img src={API_URL + '/avatar/' + this.props.username} onError={this.handleError} alt="avatar"/>
        </div>;
    }
}