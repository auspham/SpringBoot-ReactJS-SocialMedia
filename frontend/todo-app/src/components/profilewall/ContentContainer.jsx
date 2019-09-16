import React, { Component } from 'react';
import SideContentComponent from '../profilewall/SideContentComponent';
import NewsFeedComponent from '../profilewall/NewsFeedComponent';
import UpdateDetails from '../profilewall/UpdateDetails'
import AuthenticationService from "../todo/AuthenticationService";
import AccountProfileService from "../../api/todo/AccountProfileService";



class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: 'First name',
            lastname: 'Last name',
            studentnumber: 'Student number',
            email: 'Email',
            phonenumber: 'Phone number',
            aboutme: 'About me',
            isEmptyState: true
        };
    }

    triggerEditState = () => {
        this.setState({
         
          isEmptyState: false,
          isEditState: true
        })
      }
    
    
    componentDidMount() {
        console.warn("componentDidMount CC");
        this.refreshInfo();
        console.log(this.state);
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    {this.state.isEmptyState &&
                    <SideContentComponent
                    edit = {this.triggerEditState}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    studentnumber={this.state.studentnumber}
                    email={this.state.email}
                    phonenumber={this.state.phonenumber}
                    aboutme={this.state.aboutme}></SideContentComponent> }

                    {this.state.isEditState &&
                    <UpdateDetails
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        studentnumber={this.state.studentnumber}
                        email={this.state.email}
                        phonenumber={this.state.phonenumber}
                        aboutme={this.state.aboutme}
                    ></UpdateDetails> }
                    <NewsFeedComponent></NewsFeedComponent>
                </div>
            </div>

        )
    }

   

    refreshInfo() {
        let username = AuthenticationService.getLoggedInUserName();
        AccountProfileService.retrieveDetails(username)
            .then(response => {
                console.error("response cc", response.data);
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    studentnumber: response.data.studentnumber,
                    email:response.data.email,
                    studentnumber: response.data.studentnumber,
                    phonenumber: response.data.phonenumber,
                    aboutme: response.data.aboutme
                });
            })
    }
}

export default ContentContainer;