import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import SearchBarComponent from './SearchBarComponent.jsx'
import AccountProfileService from '../../api/todo/AccountProfileService'
import Logo from './assets/logo.png';


class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: AuthenticationService.getLoggedInUserName()
        }
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const username = AuthenticationService.getLoggedInUserName();
        const newTo = { 
            pathname: "/profile/" + username, 
        };

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <img src={Logo} alt="Logo" className="rmitLogo"/>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/">Home</Link></li>}
                        {isUserLoggedIn && <li><a className="nav-link" href={'/profile/' + username}>Profile</a></li>}
                        {isUserLoggedIn && <SearchBarComponent refreshInfo={this.props.refreshInfo}></SearchBarComponent>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }

    componentDidMount() {


    }

    refreshInfo() {
        let username = AuthenticationService.getLoggedInUser();
        AccountProfileService.retrieveInfo(username)
            .then(response => {
                if (!response.data.length == 0) {
                    this.setState({
                        username: response.data.username
                    });
                }
                else {
                    window.location.href = "http://localhost:4200/welcome/sept";
                }
            })
    }
}

export default HeaderComponent