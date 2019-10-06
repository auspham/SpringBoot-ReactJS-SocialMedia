import React, { Component } from "react";
import AuthenticationService, {USER_NAME_SESSION_ATTRIBUTE_NAME} from "./AuthenticationService";
import { Login } from "../login/login";
import { Register } from "../login/register";
import AccountProfileService from "../../api/main/AccountProfileService";

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
    this.changeState = this.changeState.bind(this);
  }

  // componentDidMount() {
  //   if(AuthenticationService.isUserLoggedIn()) {
  //     window.location.href = "/welcome/" + sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  //   }
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegister(values) {
    AuthenticationService.registerNewAccount(
      values.username,
      values.password,
    )
      .then(response => {
        if (response.status === 200) {
          this.setState({ registerSuccessful: true})
          alert("Register Successful");

          AccountProfileService.updateDetails(values.username,
            values.firstname,
            values.lastname,
            values.email,
            values.studentnumber,
            values.phonenumber,
            values.aboutme)

            this.changeState();

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

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";

    return (
      <div className="App">
        <div className="LoginComponent">
          <div className="Description">
            <h1>RMIT<br/>StalkerSpace</h1>
            <p>
              A fully-responsive, mobile friendly social media built with <b>ReactJS</b>,
              <b> Springboot</b>, <b>Maven</b>, <b>MySQL</b>. Fully integrated with <b>Google Cloud, </b>
              <b>Travis CI & CD</b><br/><br/>
              <span>Check the project out on our&nbsp;
              <a href={"https://github.com/RMIT-SEPT/Tom-Yum"} target={"_blank"}
                 style={{color: "white", fontWeight: "bold"}}>Github</a>.</span>

            </p>
          </div>
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

            <div
                className="container"
                ref={ref => {
                  this.container = ref;
                }}
            >

              {!isLogginActive && (
                  <Login
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      containerRef={ref => (this.current = ref)}
                      changeState={this.changeState}
                  />
              )}
              {isLogginActive && (
                  <Register
                      firstname={this.state.firstname}
                      lastname={this.state.lastname}
                      studentnumber={this.state.studentnumber}
                      email={this.state.email}
                      phonenumber={this.state.phonenumber}
                      aboutme={this.state.aboutme}
                      containerRef={ref => (this.current = ref)} handleChange={this.handleChange}
                      handleRegister={this.handleRegister}
                      changeState={this.changeState}
                  />
              )}

            </div>
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
