import React, { Component } from "react";
import MainApp from "./components/post/MainApp";
import './App.css';
import './bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // authenticated: false,
      // currentUser: null,
      // loading: false
    };

    // this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bing(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  // loadCurrentlyLoggedInUser() {
  //   this.setState({
  //     loading: true
  //   });

  //   getCurrentUser()
  //     .then(response => {
  //       this.setState({
  //         currentUser: response,
  //         authenticated: true,
  //         loading: false
  //       });
  //     }).catch(error => {
  //       this.setState({
  //         loading: false
  //       });
  //     });
  //   }

  // handleLogout() {
  //   localStorage.remoteItem(ACCESS_TOKEN);
  //   this.setState({
  //     authenticated: false,
  //     currentUser: null
  //   });
  //   alert.success("You're safely logged out!");
  // }

  // componentDidMount() {
  //   this.loadCurrentlyLoggedInUser();
  // }

  render() {
    // if (this.state.loading) {
    //   return <LoadingIndicator />;
    // }

    return (
      <div className="App">
        {/*<Counter/>*/}
        <MainApp />
      </div>
    );
  }
}

export default App;
