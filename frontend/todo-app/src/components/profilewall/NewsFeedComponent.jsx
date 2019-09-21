import React, {Component} from 'react';
import ListTodoComponents from '../../components/todo/ListTodosComponent.jsx'
import TodoComponent from '../todo/TodoComponent.jsx';
import AuthenticationService from '../todo/AuthenticationService'
import TodoDataService from '../../api/todo/TodoDataService.js'
import Socket from '../todo/StartSocket';
import "./profile.scss";

let stompClient = null;

class NewsFeedComponent extends React.Component{

    componentDidMount() {
        stompClient = Socket.connect();
        stompClient.connect({}, this.onConnected, this.onError);
    }

    refreshTodos = () => {
        if(this.child)
            this.child.refreshTodos();
       console.log("child", this.child);
    }

    onConnected = () => {
        stompClient.subscribe("/topic/status", this.refreshTodos);
    }

    onError = (err) => {
        console.error(err);
    }

    render(){
        return(
            <div className="col4">
                {AuthenticationService.getLoggedInUserName() === this.props.username ?
                    <div className="container">
                        <TodoComponent match={this.props.match} stompClient={stompClient} refreshTodos={this.refreshTodos} username={this.props.username} history={this.props.history}/>
                    </div> : ""}
                <ListTodoComponents history={this.props.history} onRef={ref => (this.child = ref)} username={this.props.username} stompClient={stompClient}/>
            </div>
        )
    }
}

export default NewsFeedComponent;