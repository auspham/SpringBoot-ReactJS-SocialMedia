import React from "react";
import loginImg from "../../login.svg";
import AuthenticationService from "../todo/AuthenticationService";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
    // this.handleUsernameChange = this.handleUsernameChange.bind(this)
    // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginClicked() {
    // sept,dummy
    // if (this.state.username === "sept" && this.state.password === "dummy") {
    //   AuthenticationService.registerSuccessfulLogin(
    //     this.state.username,
    //     this.state.password
    //   );
    //   this.props.history.push(`/welcome/${this.state.username}`);
    //   this.setState({ showSuccessMessage: true });
    //   this.setState({ hasLoginFailed: false });
    // } else {
    //   this.setState({ showSuccessMessage: false });
    //   this.setState({ hasLoginFailed: true });
    // }
    
    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        {this.state.hasLoginFailed && (
          <div className="alert alert-warning">
            Invalid Credentials or something is wrong
          </div>
        )}
        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
        <div className="content">
          <div className="form">
            <div className="form-group">
              <div className="image">
                <img src={loginImg} />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="foot">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.loginClicked}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
