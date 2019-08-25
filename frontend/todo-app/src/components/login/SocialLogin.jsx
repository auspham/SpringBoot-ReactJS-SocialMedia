import React, { Component } from "react";
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import fbLogo from '../../img/fb-logo.png';

export class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                {/* <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}> */}
                <a className="btn btn-block social-btn google">
                    <img className="socialimg" src={googleLogo} alt="Google" /> <div className="btn-social-text">Log in with Google</div></a>
                <a className="btn btn-block social-btn facebook">
                {/* <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}> */}
                    <img className="socialimg" src={fbLogo} alt="Facebook" /> <div className="btn-social-text">Log in with Facebook</div></a>
                {/* <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}> */}
                <a className="btn btn-block social-btn github">
                    <img className="socialimg" src={githubLogo} alt="Github" /> <div className="btn-social-text">Log in with Github</div></a>
            </div>
        );
    }
} 
