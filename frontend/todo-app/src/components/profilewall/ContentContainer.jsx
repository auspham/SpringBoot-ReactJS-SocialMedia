import React, {Component} from 'react';
import SideContentComponent from '../profilewall/SideContentComponent';
import NewsFeedComponent from '../profilewall/NewsFeedComponent';



class ContentContainer extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <SideContentComponent></SideContentComponent>
                    <NewsFeedComponent history={this.props.history} match={this.props.match} username={this.props.username}></NewsFeedComponent>
                </div>
            </div>

        )
    }
}

export default ContentContainer;