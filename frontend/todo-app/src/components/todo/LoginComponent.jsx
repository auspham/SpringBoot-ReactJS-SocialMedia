import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Login } from "../login/login";
import { Register } from "../login/register";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // hasLoginFailed: false,
      // showSuccessMessage: false
    };
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        // this.loginClicked = this.loginClicked.bind(this);
  }


  // handleUsernameChange(event) {
  //     console.log(event.target.name);
  //     this.setState(
  //         {
  //             [event.target.name]
  //               :event.target.value
  //         }
  //     )
  // }

  // handlePasswordChange(event) {
  //     console.log(event.target.value);
  //     this.setState({password:event.target.value})
  // }

  // loginClicked() {
  //   // sept,dummy
  //   if(this.state.username==='sept' && this.state.password==='dummy'){
  //       AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
  //       this.props.history.push(`/welcome/${this.state.username}`)
  //       this.setState({showSuccessMessage:true})
  //       this.setState({hasLoginFailed:false})
  //   }
  //   else {
  //       this.setState({showSuccessMessage:false})
  //       this.setState({hasLoginFailed:true})
  //   }

  //   AuthenticationService
  //   .executeBasicAuthenticationService(this.state.username, this.state.password)
  //   .then(() => {
  //       AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
  //       this.props.history.push(`/welcome/${this.state.username}`)
  //   }).catch( () =>{
  //       this.setState({showSuccessMessage:false})
  //       this.setState({hasLoginFailed:true})
  //   })
    // AuthenticationService.executeJwtAuthenticationService(
    //   this.state.username,
    //   this.state.password
    // )
    //   .then(response => {
    //     AuthenticationService.registerSuccessfulLoginForJwt(
    //       this.state.username,
    //       response.data.token
    //     );
    //     this.props.history.push(`/welcome/${this.state.username}`);
    //   })
    //   .catch(() => {
    //     this.setState({ showSuccessMessage: false });
    //     this.setState({ hasLoginFailed: true });
    //   });
  // }

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
          {/* {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials or something is wrong</div>}
          {this.state.showSuccessMessage && <div>Login Successful</div>} */}
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
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
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
      className="right-side"
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
