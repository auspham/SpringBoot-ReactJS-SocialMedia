import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value=""
                onChange={this.props.handleUsernameChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input 
              type="text" 
              name="email" 
              placeholder="email"
              value=""
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                value=""
                onChange={this.props.handlePasswordChange}
              ></input>
              <button type="button" className="btn text-center btn-primary center">
                Register
              </button>
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}
