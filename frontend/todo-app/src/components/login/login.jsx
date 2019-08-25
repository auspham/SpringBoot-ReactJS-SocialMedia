import React from "react";
import loginImg from "../../login.svg";
import GoogleButton from 'react-google-button';

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <div className="image">
                <img src={loginImg} />
              </div>
              <GoogleButton onClick={() => console.log('Google button clicked')}/>
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
                  type="text"
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
              onClick={this.props.loginClicked}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
