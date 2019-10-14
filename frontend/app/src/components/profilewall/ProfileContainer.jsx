import React, { Component } from "react";

import "./profile.scss";
import AccountProfileService from "../../api/main/AccountProfileService";
import { API_URL } from '../../Constants'
import Guest from "./assets/guest.jpeg"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../post/AuthenticationService";


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
      avatarURL: API_URL + "/avatar/" +this.props.username,
      backgroundUrl: API_URL + '/background/' + this.props.username,
      showBG: false,
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
    let username = AuthenticationService.getLoggedInUserName();
    if(username === this.props.username)
      this.setShow(true);
  }
  handleAvatarFile = (event) => {
    this.setState({
        avatarfile: event.target.files[0],
    });
  }
  handleBackgroundFile = (event) => {
    this.setState({
        backgroundfile: event.target.files[0],
    });
  }

  handleShowBG = () => {
    let username = AuthenticationService.getLoggedInUserName();
    if(username === this.props.username)
      this.setShowBG(true);
  }

  handleCloseBG = () => {
    this.setShowBG(false);
  }

  setShowBG = (value) => {
    this.setState({showBG: value});
  }

  onSaveAvatar = () => {
    let username = AuthenticationService.getLoggedInUserName();
    AccountProfileService.uploadAvatar(this.state.avatarfile, username).then(() => {
      this.refreshInfo();
      this.handleClose();
      window.location.reload();
    });
  }

  onSaveBackGround = () => {
    let username = AuthenticationService.getLoggedInUserName();
    AccountProfileService.uploadBackground(this.state.backgroundfile, username).then(() => {
      this.refreshInfo();
      this.handleCloseBG();
      window.location.reload();
    });
  }
  render() {
    return (
      <div className="container">
         <Modal show={this.state.showBG} onHide={this.handleCloseBG}>
          <Modal.Header closeButton>
            <Modal.Title>Change Cover Background</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Click to upload your background file, picture has to be either <strong>png/jpeg</strong></p>
            <fieldset><input id="backgroundfile" name="backgroundfile" type="file" accept="image/png, image/jpeg" onChange={this.handleBackgroundFile} className="form-control" /></fieldset>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseBG}>
              Close
          </Button>
          <Button variant="primary" onClick={this.onSaveBackGround}>
            Save Changes
          </Button>
          </Modal.Footer>
        </Modal>

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
                <div className={"banner" + (AuthenticationService.getLoggedInUserName() === this.props.username ? " uploadable" : "")} style={{background: 'url(' + this.state.backgroundUrl + ') no-repeat grey', backgroundSize: 'cover'}} alt="Profile" onClick={this.handleShowBG}> </div>
              </div>
              <div className="profile-section">
                <div className="row">
                  {/*<div className="col1">*/}
                  {/*  <ul className="profile-menu">*/}
                  {/*    <li className="list-item">*/}
                  {/*      <a>Timeline</a>*/}
                  {/*    </li>*/}
                  {/*    <li className="list-item">*/}
                  {/*      <a>About</a>*/}
                  {/*    </li>*/}
                  {/*    <li className="list-item">*/}
                  {/*      <a>Friends</a>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</div>*/}
                  <div className="avatar-container">
                    <div className={"image-cropper" + (AuthenticationService.getLoggedInUserName() === this.props.username ? " uploadable" : "")} onClick={this.handleShow}>
                      <img
                        src={this.state.avatarURL}
                        className="profile-pic"
                        alt="avatar"
                        onError={this.handleError}
                      ></img>
                    </div>
                    <div className="avatar-author-content">{this.props.username}</div>
                  </div>
                  {/*<div className="col2">*/}
                  {/*  <ul className="profile-menu">*/}
                  {/*    <li className="list-item">*/}
                  {/*      <a>Photos</a>*/}
                  {/*    </li>*/}
                  {/*    <li className="list-item">*/}
                  {/*      <a>Videos</a>*/}
                  {/*    </li>*/}
                  {/*    <li className="list-item">*/}
                  {/*      <div className="more">...</div>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</div>*/}
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
