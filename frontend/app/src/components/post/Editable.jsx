import React, { Component } from 'react'
import PostDataService from '../../api/main/PostDataService.js'
import AuthenticationService from './AuthenticationService.js'
export default class Editable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
        }
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleUpdate = (event) => {
        let post = {
            id: this.props.post.id,
            description: this.state.content,
            targetDate: this.props.post.targetDate
        }

        PostDataService.updatePost(this.props.username, this.props.post.id, post)
                .then(() => {this.props.refreshFeed(); this.props.stompClient.send("/app/postStatus", {}, true)})

        this.props.toggleShow();
    }

    render() {
        return (
            <div className="editableContent">
                <textarea onChange={this.handleChange} value={this.state.content}></textarea>
                <div className="create-tool">
                    <button className="btn btn-primary btn-status" onClick={this.handleUpdate} type="submit">Save</button>
                </div>
            </div>
        )
    }
}
