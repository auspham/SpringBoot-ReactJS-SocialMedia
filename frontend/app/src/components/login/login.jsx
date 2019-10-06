import React from "react";
import {Form} from "formik";

export class Login extends React.Component {

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>

        <div className="content">
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
          <div className={"footerBtn"}>
          <button
              type="button"
              className="btn btn-success"
              name={"login"}
              onClick={this.props.handleSubmit}
            >
              Login
            </button>
            <button
                type="button" name={"register"}
                className="btn btn-info"
                onClick={this.props.changeState}
            >
              register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
