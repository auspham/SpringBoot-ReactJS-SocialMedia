import React, { Component } from 'react'
import PostDataService from '../../api/main/PostDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import PostCard from "./PostCard"
class ListPostsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            message: null
        }
        this.deletePostClicked = this.deletePostClicked.bind(this)
        this.refreshFeed = this.refreshFeed.bind(this)
        this.show = false;
        this.refers = [];
    }

    componentWillUnmount() {
        if(this.props.onRef) {
            this.props.onRef(undefined)   
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        if(this.props.onRef) {
            this.props.onRef(this)
        }

        this.refreshFeed();

    }

    refreshFeed() {

        PostDataService.retrieveAllPosts(this.props.username)
            .then(
                response => {
                    this.setState({ posts: response.data.reverse() })
                }
            )
        
        this.refers.forEach(refer => {
            if(refer)
                refer.refreshComments()
        });
    }

    deletePostClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        PostDataService.deletePost(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of post ${id} Successful` })
                    this.refreshFeed();
                    this.props.stompClient.send("/app/postStatus", {}, true);
                }
            )

    }

    handleClose = () => this.setShow(false);
    
    render() {
        return (
            <div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="wrap">
                    <div className="table">
                        <div>
                            {
                                this.state.posts.map(
                                    (post,i) =>
                                       <PostCard key={post.id} post={post} ref={ref => this.refers[post.id] = ref} refreshFeed={this.refreshFeed} deletePostClicked={this.deletePostClicked} username={this.props.username} stompClient={this.props.stompClient}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPostsComponent