import React, { Component } from "react";

import updateinfobtn from "../../img/setting.svg"
import msgbtn from "../../img/message.svg"
import notificationbtn from "../../img/notification.svg"
import "./profile.scss";
import AccountProfileService from "../../api/todo/AccountProfileService";
import { API_URL } from '../../Constants'
import Guest from "./assets/doctor-placeholder-1.jpg"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../todo/AuthenticationService";


class ProfileContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      firstname: '',
      lastname: '',
      avatarlink: '',
      backgroundlink: '',
      show: false,
      avatarloaded:false,
      backgroundloaded:false,
      avatarURL: API_URL + "/avatar/" +this.props.username
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

  setShow = (value) => {
    this.setState({show: value});
  }
  handleClose = () => {
    this.setShow(false);
  }

  handleShow = () => {
    this.setShow(true);
  }
  handleAvatarFile = (event) => {
    this.setState({
        avatarfile: event.target.files[0],
    });
  }
  handleBackgroundFile = (event) => {
    console.warn(event.target.files[0]);
    this.setState({
        backgroundfile: event.target.files[0],
    });
  }

  onSaveAvatar = () => {
    let username = AuthenticationService.getLoggedInUserName();
    AccountProfileService.uploadAvatar(this.state.avatarfile, username).then(() => {
      this.refreshInfo();
      this.handleClose();
      // this.setState(prevState => ({
      //   avatarURL: prevState.avatarURL+" "
      // }));
      window.location.reload();
    });
  }
  render() {
    return (
      <div className="container">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Click to upload your avatar file, picture has to be either <strong>png/jpeg</strong></p>
            <fieldset><input id="avatarfile" name="avatarfile" type="file" accept="image/png, image/jpeg" onChange={this.handleAvatarFile} className="form-control" /></fieldset>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
          <Button variant="primary" onClick={this.onSaveAvatar}>
            Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
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
                    <div className="image-cropper" onClick={this.handleShow}>
                      <img
                        src={this.state.avatarURL}
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
