import React, { Component } from "react";
import "./profile.scss";
import ProfileContainer from "../profilewall/ProfileContainer";
import ContentContainer from "../profilewall/ContentContainer";
import AccountProfileService from "../../api/main/AccountProfileService"


class AccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      value: ''
    }
  }

  

  render() {
    return (
      <div className="profilePage">
        <ProfileContainer username={this.state.username}></ProfileContainer>
        <ContentContainer history={this.props.history} match={this.props.match} username={this.state.username}></ContentContainer>
      </div>
    );
  }

  componentDidMount() {
      this.refreshInfo();
  }

  refreshInfo() {
    let username = this.state.username;
      AccountProfileService.retrieveInfo(username)
        .then(response => {
          if(!response.data.length == 0){
              this.setState({
                value: response.data[0].username
              });
          }
          else{
            window.location.href = "http://localhost:4200/welcome/sept";
          }
        })
  }
}

export default AccountProfile;
