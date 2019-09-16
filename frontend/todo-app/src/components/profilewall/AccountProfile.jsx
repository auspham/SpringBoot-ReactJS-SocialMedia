import React, { Component } from "react";
import "./profile.scss";
import ProfileContainer from "../profilewall/ProfileContainer";
import ContentContainer from "../profilewall/ContentContainer";
import AuthenticationService from "../todo/AuthenticationService";
import AccountProfileService from "../../api/todo/AccountProfileService";

class AccountProfile extends React.Component {
  constructor(props) {
    console.log('account profile')
    super(props);
    this.state = {
      username: '',
    };
  }

  

  render() {
    console.warn("Debugging AccountProfile, the username: " + this.state.username);
    return (
      <div className="body">
        <ProfileContainer username={this.state.username}></ProfileContainer>
        <ContentContainer></ContentContainer>
      </div>
    );
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount AP')
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate AP')
  //   console.log(nextProps)
  //   console.log(nextState)
  //   return true
  // }

  componentDidMount() {
    console.warn("componentDidMount AP");
    this.refreshInfo();
    console.log(this.state);
  }

  refreshInfo() {
    let username = AuthenticationService.getLoggedInUserName();
    // console.log("get username AP: ", username);
    // this.state.username = username;
    AccountProfileService.retrieveInfo(username)
    .then(response => {
      console.error("response", response);
      this.setState({
        username: response.data[0].username
      });
    })
  }
}

export default AccountProfile;
