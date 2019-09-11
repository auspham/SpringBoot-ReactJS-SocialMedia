import React, {Component} from 'react';
import ListTodoComponents from '../../components/todo/ListTodosComponent.jsx'
import TodoComponent from '../todo/TodoComponent.jsx';
import "./profile.scss";

class NewsFeedComponent extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col4">
                <TodoComponent match={this.props.match} username={this.props.username} history={this.props.history}/>
                <ListTodoComponents history={this.props.history} username={this.props.username}/>
            </div>
        )
    }
}

export default NewsFeedComponent;