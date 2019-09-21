import React, { Component } from 'react'
import "./search.scss"
import AccountProfileService from "../../api/todo/AccountProfileService"

class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            search: "",
            display: false,
            mouseEnter:  false
        }
    }

    componentDidMount() {
        this.getAllUser();
    }

    onConnected = () => {

    }

    getAllUser = () => {
        AccountProfileService.getAllUser().then(response => {
            this.setState({
                users: response.data
            });
        })
    }

    onFocus = () => {
        this.getAllUser();
        this.setState({ display: true });
    }
    
    onBlur = () => {
        if(!this.state.mouseEnter)
            this.setState({ display: false });
    }

    handleChange = (event) => {
        let content = event.target.value;
        this.setState({ search: content });
    }

    onMouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    onMouseLeave = () => {
        this.setState({ mouseEnter: false });
    }

    render() {
        return (
            <div className="search-group">
                <input className="searchBar" onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.search} type="input" placeholder="Search.." onChange={this.handleChange}/>
                {this.state.display ? 
                <div className="resultBox" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    {this.state.users.filter(user => this.state.search.length > 0 ? user.username.indexOf(this.state.search) > -1 : user).map(each => <a href={"/profile/" + each.username}><div className="userSearch">{each.username}</div></a>)}
                </div> : null }
            </div>
        )
    }
}

export default SearchBarComponent;