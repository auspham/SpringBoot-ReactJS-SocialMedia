import React, {Component} from 'react';
import ListTodoComponents from '../../components/todo/ListTodosComponent.jsx'
import TodoComponent from '../todo/TodoComponent.jsx';


class NewsFeedComponent extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col4">
                <TodoComponent match={this.props.match} history={this.props.history}/>
                <ListTodoComponents history={this.props.history}/>
            </div>
        )
    }
}

export default NewsFeedComponent;