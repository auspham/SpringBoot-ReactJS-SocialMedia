import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Login } from "../login/login";
import { Register } from "../login/register";
import AccountProfileService from "../../api/todo/AccountProfileService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: 'First name',
      lastname: 'Last name',
      studentnumber: 'Student number',
      email: 'Email',
      phonenumber: 'Phone number',
      aboutme: 'About me',
      hasLoginFailed: false,
      showSuccessMessage: false,
      registerSuccessful: false
    };
    this.handleRegister = this.handleRegister.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegister(values) {
    AuthenticationService.registerNewAccount(
      values.username,
      values.password,
      'email@email.com'
    )
      .then(response => {
        console.log('register response:', response);
        if (response.status === 200) {
          this.setState({ registerSuccessful: true })
          alert("Register Successful");

          AccountProfileService.updateDetails(values.username,
            values.firstname,
            values.lastname,
            values.email,
            values.studentnumber,
            values.phonenumber,
            values.aboutme)


        }
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
        alert("User already exists or something is wrong")

      });
  }

  handleSubmit() {
    AuthenticationService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(response => {
        AuthenticationService.registerSuccessfulLoginForJwt(
          this.state.username,
          response.data.token
        );
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
        alert("Invalid Credentials or something is wrong");
      });
  }

  changeState() {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.side.classList.remove("right");
      this.side.classList.add("left");
    } else {
      this.side.classList.remove("left");
      this.side.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        {/* {this.state.hasLoginFailed && !this.state.showSuccessMessage && !this.state.registerSuccessful && (
              <div className="alert alert-warning fix-alert">
                Invalid Credentials or something is wrong
              </div>
            )}
          {this.state.showSuccessMessage && !this.state.hasLoginFailed && !this.state.registerSuccessful
            && <div className="alert alert-success fix-alert">
                Login successful
              </div>}
          {this.state.registerSuccessful && !this.state.showSuccessMessage && !this.state.hasLoginFailed && <div className="alert alert-success fix-alert">
                Register successful
              </div>} */}
        <div className="login">

          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.side = ref)}
            onClick={this.changeState.bind(this)}
          />
          <div
            className="container"
            ref={ref => {
              this.container = ref;
            }}
          >

            {isLogginActive && (
              <Login
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                containerRef={ref => (this.current = ref)}
              />
            )}
            {!isLogginActive && (
              <Register
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                studentnumber={this.state.studentnumber}
                email={this.state.email}
                phonenumber={this.state.phonenumber}
                aboutme={this.state.aboutme}
                containerRef={ref => (this.current = ref)} handleChange={this.handleChange}
                handleRegister={this.handleRegister}
              />
            )}

          </div>
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side right"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginComponent;
