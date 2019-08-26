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
                value={this.props.username}
                onChange={this.props.handleChange}
              ></input>
            </div>
            {/* <div className="form-group">
              <label htmlFor="username">Email</label>
              <input 
              type="text" 
              name="email" 
              placeholder="email"
              value=""
              ></input>
            </div> */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.props.password}
                onChange={this.props.handleChange}
              ></input>
              <button type="button" className="btn text-center btn-primary center"
              onClick={this.props.handleRegister}>
                Register
              </button>
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}
