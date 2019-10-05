import React from "react";
import loginImg from "../../login.svg";
import { SocialLogin } from "./SocialLogin";

export class Login extends React.Component {

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="image">
            <img src={loginImg} alt="Logo" />
        </div>
        <div className="content">
        <SocialLogin></SocialLogin>

          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <div className="form">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.props.username}
                  onChange={this.props.handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.props.password}
                  onChange={this.props.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="foot">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.props.handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
