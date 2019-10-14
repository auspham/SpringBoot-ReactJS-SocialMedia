import React, { Component } from 'react'
import { ReactComponent as Close } from './assets/times.svg';
import { ReactComponent as Edit } from './assets/edit.svg';
import AuthenticationService from './AuthenticationService';
import PostDataService from '../../api/main/PostDataService';
import Editable from './Editable';
import moment from 'moment';
import Avatar from './Avatar';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
let stompClient = null;
export default class PostCard extends Component {
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
        this.setState({comments: this.props.post.comments}, this.scrollToBottom());
        this.refreshComments();
    }

    refreshComments = () => {
        PostDataService.retrievePostComments(this.state.target, this.props.post.id).then(res => {
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
            targetDate: moment(new Date()).format()
        }

        PostDataService.postComment(this.state.target, this.props.post.id, comment).then((res, err) => {
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
        <div className="ui-block ui-custom" key={this.props.post.id}>
            <div className="status-head">
                <div className="status-left">
                    <Avatar username={this.props.username}/>
                    <div style={{float: 'left'}}>
                        <a href={'/profile/' + this.props.username}>{this.props.username}</a>
                        <div className="date">{moment(this.props.post.targetDate).fromNow()}</div>
                    </div>
                </div>
                {this.props.username == AuthenticationService.getLoggedInUserName() ? <div className="status-right">
                    <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Edit this post</Tooltip>}><Edit onClick={this.toggleShow}/></OverlayTrigger>
                    <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Delete this post</Tooltip>}><Close name="delete" onClick={() => this.props.deletePostClicked(this.props.post.id)}/></OverlayTrigger>
                </div> : ""}
            </div>
            <div className="status-content">
                {!this.state.show && this.props.post.description}
                {this.state.show && <Editable post={this.props.post} toggleShow={this.toggleShow} username={this.props.username} refreshFeed={this.props.refreshFeed} content={this.props.post.description} stompClient={this.props.stompClient}></Editable>}
            </div>
            <div className="comments">
                <div className="commentHolder" ref="comments">
                    {this.state.comments.map((comment, i) => <div className="comment" key={i}><Avatar username={comment.username}/><div className="commenter"><a href={'/profile/' + comment.username}>{comment.username}</a></div> <div className="comment-desc">{comment.description}</div></div>)}
                </div>

                <div className="comment-control form-row">
                    <input type="text" className="col-md-9 col-sm-9 col-xs-9" onChange={this.handleChange} value={this.state.content} placeholder="Write a comment.." onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleComment();
                    }
                }}></input>
                    <button className="btn btn-primary btn-status col-md-2 col-sm-2 col-xs-2" onClick={this.handleComment}>Comment</button>
                </div>
            </div>
        </div>);
    }
}