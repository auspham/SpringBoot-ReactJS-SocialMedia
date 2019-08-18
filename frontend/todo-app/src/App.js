import React, { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent'
//import SecondComponent from './components/learning-examples/SecondComponent'
//import ThirdComponent from './components/learning-examples/ThirdComponent'
//import Counter from './components/counter/Counter'
import {Login} from './components/login';
import {Register} from './components/login';
import './components/login/App.scss';
import './bootstrap.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  changeState() {
    const { isLogginActive } = this.state;
      if(isLogginActive){
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      }
      else{
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
      }
      this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive}));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => {this.container = ref}}>
            {isLogginActive && 
            (<Login containerRef={ref => (this.current = ref)}/>)}
            {!isLogginActive && 
            (<Register containerRef={ref => (this.current = ref)}/>)}
          </div>
        <RightSide 
        current={current}
        currentActive={currentActive} 
        containerRef={ref => (this.rightSide = ref)} 
        onClick={this.changeState.bind(this)} />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return  (<div className="right-side" 
  ref={props.containerRef} 
  onClick={props.onClick}
  >
    <div className="inner-container">
      <div className="text">{props.current}</div>
    </div>
    </div>
  );
};
// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="LearningComponents">
//          My Hello World
//          <FirstComponent></FirstComponent>
//          <SecondComponent></SecondComponent>
//          <ThirdComponent></ThirdComponent>
//       </div>
//     );
//   }
// }

export default App;