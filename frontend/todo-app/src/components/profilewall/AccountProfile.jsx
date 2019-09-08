import React, { Component } from "react";
import "./profile.scss";
import ProfileContainer from "../profilewall/ProfileContainer";
import ContentContainer from "../profilewall/ContentContainer";

class AccountProfile extends React.Component {
  render() {
    return (
      <div className="body">
        <ProfileContainer></ProfileContainer>
        <ContentContainer></ContentContainer>
      </div>
    );
  }
}

export default AccountProfile;
