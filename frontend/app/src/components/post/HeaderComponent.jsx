import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import SearchBarComponent from './SearchBarComponent.jsx'
import AccountProfileService from '../../api/main/AccountProfileService'
import Logo from './assets/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from './Avatar';
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
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
                    <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Back to home</Tooltip>}><Link className="nav-link" to="/welcome/"><img src={Logo} alt="Logo" className="rmitLogo"/></Link>
                    </OverlayTrigger>
                    <ul className="navbar-nav d-md-block d-none" style={{marginRight: "1.1rem"}}>
                        <Link className="nav-link" to="/welcome/">Home</Link>
                    </ul>

                    <SearchBarComponent refreshInfo={this.props.refreshInfo}></SearchBarComponent>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <OverlayTrigger key={"bottom"} placement={"bottom"} overlay={<Tooltip id={'tooltip-bottom'}> Visit your profile </Tooltip>}>
                                <li className={"toProfile"}><Avatar username={username}/><a className="nav-link" href={'/profile/' + username}>{username}</a></li>
                            </OverlayTrigger>
                            <Link className="nav-link d-md-none" to="/welcome/">Home</Link>

                            <li><Link className="nav-link" name="logout" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
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