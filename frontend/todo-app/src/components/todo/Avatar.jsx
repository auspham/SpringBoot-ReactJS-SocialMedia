import React, { Component } from 'react'
import Guest from "../profilewall/assets/doctor-placeholder-1.jpg"
import {API_URL} from '../../Constants'
export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: API_URL + '/avatar/' + this.props.username
        }
    }
    handleError = (e) => {
        e.target.src = Guest;
    }

    render() {
        return <div className="cmt-avatar">
            <img src={this.state.src} onError={this.handleError} alt="avatar"/>
        </div>;
    }
}