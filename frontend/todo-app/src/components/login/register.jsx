import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div className="base-container">
            <div className ="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholders="username"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="text" name="email" placeholders="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholders="password"></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type ="button" className = "btn">
                    Register
                </button>
            </div>
        </div>

}
}

