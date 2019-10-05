import React, { Component } from 'react';
import SideContentComponent from '../profilewall/SideContentComponent';
import NewsFeedComponent from '../profilewall/NewsFeedComponent';
import UpdateDetails from '../profilewall/UpdateDetails'
import AuthenticationService from "../post/AuthenticationService";
import AccountProfileService from "../../api/main/AccountProfileService";


class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            studentnumber: '',
            email: '',
            phonenumber: '',
            aboutme: '',
            isEditing: false
        };
    }

    triggerEditState = () => {
        this.setState(prevState => ({
          isEditing: !prevState.isEditing
        }))
        this.refreshInfo();
    }
    
    
    componentDidMount() {
        this.refreshInfo();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {!this.state.isEditing ?
                    <SideContentComponent
                    edit = {this.triggerEditState}
                    username={this.props.username}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    studentnumber={this.state.studentnumber}
                    email={this.state.email}
                    phonenumber={this.state.phonenumber}
                    aboutme={this.state.aboutme}></SideContentComponent> :
                    <UpdateDetails
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        studentnumber={this.state.studentnumber}
                        email={this.state.email}
                        phonenumber={this.state.phonenumber}
                        aboutme={this.state.aboutme}
                        triggerEditState = {this.triggerEditState}
                    ></UpdateDetails> }
                    <NewsFeedComponent history={this.props.history} match={this.props.match} username={this.props.username}></NewsFeedComponent>
                </div>
            </div>

        )
    }

   

    refreshInfo() {
        let username = AuthenticationService.getLoggedInUserName();
        AccountProfileService.retrieveDetails(username)
            .then(response => {
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email:response.data.email,
                    studentnumber: response.data.studentnumber,
                    phonenumber: response.data.phonenumber,
                    aboutme: response.data.aboutme
                });
            })
    }
}

export default ContentContainer;