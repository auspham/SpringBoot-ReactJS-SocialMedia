import React, { Component } from "react";
import MainApp from "./components/post/MainApp";
import './App.css';
import './bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <MainApp />
      </div>
    );
  }
}

export default App;
