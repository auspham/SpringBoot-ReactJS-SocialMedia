import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import SearchBarComponent from './SearchBarComponent.jsx'
import AccountProfileService from '../../api/main/AccountProfileService'
import Logo from './assets/logo.png';
import Navbar from 'react-bootstrap/Navbar'

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
            <>
            {isUserLoggedIn && <header>
                <Navbar expand={"md"} className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link className="nav-link" to="/welcome/"><img src={Logo} alt="Logo" className="rmitLogo"/></Link>
                    <SearchBarComponent refreshInfo={this.props.refreshInfo}></SearchBarComponent>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li><a className="nav-link" href={'/profile/' + username}>Profile</a></li>
                            <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
                        </ul>

                    </Navbar.Collapse>

                </Navbar>
            </header>}
            </>
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