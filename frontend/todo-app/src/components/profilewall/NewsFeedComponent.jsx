import React, {Component} from 'react';
import ListTodoComponents from '../../components/todo/ListTodosComponent.jsx'
import TodoComponent from '../todo/TodoComponent.jsx';
import AuthenticationService from '../todo/AuthenticationService'
import TodoDataService from '../../api/todo/TodoDataService.js'

import "./profile.scss";

class NewsFeedComponent extends React.Component{
    constructor(){
        super();
    }

    refreshTodos = () => {
       this.child.refreshTodos();
       console.log("child", this.child);
    }

    render(){
        return(
            <div className="col4">
                <div className="container">
                    <TodoComponent match={this.props.match} refreshTodos={this.refreshTodos} username={this.props.username} history={this.props.history}/>
                </div>
                <ListTodoComponents history={this.props.history} onRef={ref => (this.child = ref)} username={this.props.username}/>
            </div>
        )
    }
}

export default NewsFeedComponent;