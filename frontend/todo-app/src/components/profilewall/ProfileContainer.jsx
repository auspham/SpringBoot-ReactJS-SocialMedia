import React, { Component } from "react";

import updateinfobtn from "../../img/setting.svg"
import msgbtn from "../../img/message.svg"
import notificationbtn from "../../img/notification.svg"
import "./profile.scss";
import AccountProfileService from "../../api/todo/AccountProfileService";
import { API_URL } from '../../Constants'
import Guest from "./assets/doctor-placeholder-1.jpg"
class ProfileContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.username,
      firstname: '',
      lastname: '',
      avatarlink: '',
      backgroundlink: ''
    }

  }
  componentDidMount() {
    this.refreshInfo();
  }

  refreshInfo() {
    let username = this.state.username;

    AccountProfileService.retrieveDetails(username)
      .then(response => {
        this.setState({
          username: username,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
      })
  }

  handleError = (e) => {
    e.target.src = Guest;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="ui-block">
              <div className="top-header-thumb">
                <div className="banner" style={{background: 'url(' + API_URL + '/background/' + this.state.username + ') no-repeat grey', backgroundSize: 'cover'}} alt="Profile"> </div>
              </div>
              <div className="profile-section">
                <div className="row">
                  <div className="col1">
                    <ul className="profile-menu">
                      <li className="list-item">
                        <a>Timeline</a>
                      </li>
                      <li className="list-item">
                        <a>About</a>
                      </li>
                      <li className="list-item">
                        <a>Friends</a>
                      </li>
                    </ul>
                  </div>
                  <div className="avatar-container">
                    <div className="image-cropper">
                      <img
                        src={API_URL + "/avatar/" +this.state.username}
                        className="profile-pic"
                        alt="avatar" 
                        onError={this.handleError}
                      ></img>
                    </div>
                    <div className="avatar-author-content">{this.state.firstname} {this.state.lastname}</div>
                  </div>
                  <div className="col2">
                    <ul className="profile-menu">
                      <li className="list-item">
                        <a>Photos</a>
                      </li>
                      <li className="list-item">
                        <a>Videos</a>
                      </li>
                      <li className="list-item">
                        <div className="more">...</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="control-block-button">
                  <button className="control-button"><img src={updateinfobtn}></img></button>
                  <button className="control-button"><img src={msgbtn}></img></button>
                  <button className="control-button"><img src={notificationbtn}></img></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
