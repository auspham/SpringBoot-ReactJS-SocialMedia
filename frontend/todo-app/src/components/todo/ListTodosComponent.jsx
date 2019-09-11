import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import { ReactComponent as Close } from './assets/times.svg';
import { ReactComponent as Edit } from './assets/edit.svg';

var Modal = require('react-bootstrap-modal')

class ListTodosComponent extends Component {
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.show = false;
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();

        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    console.log('response', response);
                    this.setState({ todos: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/todos/${id}`)
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);
    
    setShow = (value) => {
        this.setState({
            show: value
        })
    }
    render() {

        let closeModal = () => this.setState({ open: false })

        return (
            <div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <div className="table">
                        <div>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <div className="ui-block ui-custom" key={todo.id}>
                                            <div className="status-head">
                                                <div className="status-left">
                                                    {this.props.username}
                                                    <div className="date">{moment(todo.targetDate).format('YYYY-MM-DD')}</div>
                                                </div>
                                                <div className="status-right">
                                                    {/* <button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button> */}
                                                    {/* <button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}><Close/></button> */}
                                                    <Edit onClick={this.handleShow}/>
                                                    <Close onClick={() => this.deleteTodoClicked(todo.id)}/>
                                                </div>
                                            </div>
                                            <div className="status-content">
                                                {todo.description}
                                            </div>
                                        </div>
                        
                                )
                            }
                        </div>
                    </div>
                    <Modal
                    show={this.state.show}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Some Content here</p>
                    </Modal.Body>
                    <Modal.Footer>
                        // If you don't have anything fancy to do you can use
                        // the convenient `Dismiss` component, it will
                        // trigger `onHide` when clicked
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
            
                        // Or you can create your own dismiss buttons
                        <button className='btn btn-primary'>
                        Save
                        </button>
                    </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent