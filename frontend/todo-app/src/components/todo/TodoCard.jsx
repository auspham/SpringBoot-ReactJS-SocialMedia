import React, { Component } from 'react'
import { ReactComponent as Close } from './assets/times.svg';
import { ReactComponent as Edit } from './assets/edit.svg';
import AuthenticationService from './AuthenticationService'
import TodoDataService from '../../api/todo/TodoDataService'
import Editable from './Editable'
import moment from 'moment'

export default class TodoCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            target: this.props.username,
            show: false,
            comments: [],
            content: ''
        }
    }

    toggleShow = (event) => {
        this.setShow(!this.state.show);
    }
    
    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    componentDidMount() {
        this.refreshComments();
    }

    refreshComments = () => {
        console.log("refreshing comments");
        TodoDataService.retrieveTodoComments(this.state.target, this.props.todo.id).then(res => {
            this.setState({comments: res.data});
        });
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleComment = () => {
        let username = AuthenticationService.getLoggedInUserName()

        let comment = {
            username: username,
            description: this.state.content,
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        TodoDataService.postTodoComment(this.state.target, this.props.todo.id, comment).then((res,err) => {
            if(err) {
                console.log("err comment", err);
            }
            this.refreshComments();
        });
        this.setState({content: ''});
    }

    render() {
        return (   
        <div className="ui-block ui-custom" key={this.props.todo.id}>
            <div className="status-head">
                <div className="status-left">
                    {this.props.username}
                    <div className="date">{moment(this.props.todo.targetDate).format('YYYY-MM-DD')}</div>
                </div>
                <div className="status-right">
                    <Edit onClick={this.toggleShow}/>
                    <Close onClick={() => this.props.deleteTodoClicked(this.props.todo.id)}/>
                </div>
            </div>
            <div className="status-content">
                {!this.state.show && this.props.todo.description}
                {this.state.show && <Editable todo={this.props.todo} toggleShow={this.toggleShow} username={this.props.username} refreshTodos={this.props.refreshTodos} content={this.props.todo.description}></Editable>}
            </div>
            <div className="comments">
                <div>
                    {this.state.comments.map((comment, i) => <div className="todo" key={i}>{comment.username}: {comment.description}</div>)}
                </div>
                <input type="text" onChange={this.handleChange} value={this.state.content}></input>
                <button onClick={this.handleComment}>Comment</button>
            </div>
        </div>);
    }
}