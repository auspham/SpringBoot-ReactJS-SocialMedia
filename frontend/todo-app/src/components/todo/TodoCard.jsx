import React, { Component } from 'react'
import { ReactComponent as Close } from './assets/times.svg';
import { ReactComponent as Edit } from './assets/edit.svg';
import AuthenticationService from './AuthenticationService'
import TodoDataService from '../../api/todo/TodoDataService'
import Editable from './Editable'
import moment from 'moment'
import Socket from './StartSocket'
import Avatar from './Avatar'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
let stompClient = null;
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
        this.setState({comments: this.props.todo.comments}, this.scrollToBottom());
        this.refreshComments();
    }

    refreshComments = () => {
        TodoDataService.retrieveTodoComments(this.state.target, this.props.todo.id).then(res => {
            this.setState({comments: res.data});
            this.scrollToBottom();
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
                console.error("err comment", err);
            }
            this.refreshComments();
            this.props.stompClient.send("/app/postStatus", {}, true);
        });
        this.setState({content: ''});
    }

    scrollToBottom = () => {
        var object = this.refs.comments;
        if (object)
          object.scrollTop = object.scrollHeight;
    }

    render() {
        return (   
        <div className="ui-block ui-custom" key={this.props.todo.id}>
            <div className="status-head">
                <div className="status-left">
                    <Avatar username={this.props.username}/>
                    <div style={{float: 'left'}}>
                        <a href={'/profile/' + this.props.username}>{this.props.username}</a>
                        <div className="date">{moment(this.props.todo.targetDate).format('YYYY-MM-DD')}</div>
                    </div>
                </div>
                {this.props.username == AuthenticationService.getLoggedInUserName() ? <div className="status-right">
                    <Edit onClick={this.toggleShow}/>
                    <Close onClick={() => this.props.deleteTodoClicked(this.props.todo.id)}/>
                </div> : ""}
            </div>
            <div className="status-content">
                {!this.state.show && this.props.todo.description}
                {this.state.show && <Editable todo={this.props.todo} toggleShow={this.toggleShow} username={this.props.username} refreshTodos={this.props.refreshTodos} content={this.props.todo.description} stompClient={this.props.stompClient}></Editable>}
            </div>
            <div className="comments">
                <div className="commentHolder" ref="comments">
                    {this.state.comments.map((comment, i) => <div className="comment" key={i}><Avatar username={comment.username}/><div className="commenter"><a href={'/profile/' + comment.username}>{comment.username}</a></div> <div className="comment-desc">{comment.description}</div></div>)}
                </div>

                <div className="comment-control form-row">
                    <input type="text" className="col-md-9" onChange={this.handleChange} value={this.state.content} placeholder="Write a comment.." onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleComment();
                    }
                }}></input>
                    <button className="btn btn-primary btn-status col-md-2" onClick={this.handleComment}>Comment</button>
                </div>
            </div>
        </div>);
    }
}