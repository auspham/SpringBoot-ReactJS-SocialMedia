import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
import { ReactComponent as Empty } from './assets/empty.svg';
import TodoCard from './TodoCard'
import TodoComponent from './TodoComponent';
import Socket from '../todo/StartSocket';
import moment from 'moment';


let stompClient = null;

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
        this.refers = [];
    }

    componentDidMount() {
        this.retrieveAllTodos();
        stompClient = Socket.connect();
        stompClient.connect({}, this.onConnected, this.onError);
        window.scrollTo(0, 0);
    }

    onConnected = () => {
        stompClient.subscribe("/topic/status", this.retrieveAllTodos);
    }

    onError = (err) => {
        console.error(err);
    }

    retrieveAllTodos = (payload) => {
        // this.child.current.refreshComments();
        TodoDataService.retrieveAll().then(response => {
            this.setState({
                todos: response.data.sort(function(a,b) {
                    return moment.utc(a.targetDate).diff(moment.utc(b.targetDate));
                }).reverse()
            })
        });
        this.refers.forEach(refer => {
            if(refer)
                refer.refreshComments()
        });
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName();
        let that = this;
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                    that.retrieveAllTodos();
                    stompClient.send("/app/postStatus", {}, true);
                }
            );
    }   


    render() {
        return (
            <div className="generalTodo">
                <TodoComponent refreshTodos={this.retrieveAllTodos} username={AuthenticationService.getLoggedInUserName()} stompClient={stompClient}/>
                {this.state.todos.length > 0 ? <>
                {this.state.todos.map(
                    (todo,i) =>
                        <TodoCard key={todo.id} todo={todo} ref={ref => this.refers[todo.id] = ref} refreshTodos={this.retrieveAllTodos} deleteTodoClicked={this.deleteTodoClicked} username={todo.username} stompClient={stompClient}/>
                )}
                </> : <Empty width={500}/>}
            </div>
        )
    }

}


export default WelcomeComponent