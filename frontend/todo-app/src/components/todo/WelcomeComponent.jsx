import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
import { ReactComponent as Empty } from './assets/empty.svg';
import TodoCard from './TodoCard'
class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        this.retrieveAllTodos();
    }

    retrieveAllTodos = () => {
        TodoDataService.retrieveAll().then(response => {
            this.setState({
                todos: response.data.sort(function(a,b) {
                    return new Date(b.targetDate) - new Date(a.targetDate);
                }).reverse()
            })
        });
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName();
        let that = this;
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                    that.retrieveAllTodos()
                }
            );
    }   


    render() {
        return (
            <div className="generalTodo">
                {this.state.todos.length > 0 ? <>
                {this.state.todos.map(
                    (todo,i) =>
                        <TodoCard key={todo.id} todo={todo} refreshTodos={this.retrieveAllTodos} deleteTodoClicked={this.deleteTodoClicked} username={todo.username}/>
                )}
                </> : <Empty width={500}/>}
            </div>
        )
    }

}


export default WelcomeComponent