import React, {Component} from 'react';
import ListTodoComponents from '../../components/todo/ListTodosComponent.jsx'


class NewsFeedComponent extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col4">
                <ListTodoComponents history={this.props.history}/>
            </div>
        )
    }
}

export default NewsFeedComponent;