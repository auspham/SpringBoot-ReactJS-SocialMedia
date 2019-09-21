import React, {Component} from 'react';
import AuthenticationService from "../todo/AuthenticationService";
import AccountProfileService from "../../api/todo/AccountProfileService";


class SideContentComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            studentnumber: this.props.studentnumber,
            email: this.props.email,
            phonenumber: this.props.phonenumber,
            aboutme: this.props.aboutme
        }
    }

    componentDidMount() {
        
        this.refreshInfo();
        console.log(this.state);
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

    render(){
        return(
           
            <div className="col3">
                <div className="ui-block">
                    <div className="ui-title" style={{ display: "flex", justifyContent: 'centre' }}>Contact Details<button onClick={this.props.edit} style={{ marginLeft : "auto" }}>Edit</button></div>
                    <div className="ui-content">
                        <div className="personal-info">

                            <li><span className="title">About Me</span>
                            <span className="text">{this.state.aboutme}</span></li>
                            <li><span className="title">Student No.</span>
                            <span className="text">{this.state.studentnumber}</span></li>
                            <li><span className="title">Email</span>
                            <span className="text">{this.state.email}</span></li>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SideContentComponent;