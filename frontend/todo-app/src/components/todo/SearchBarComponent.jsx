import React, { Component } from 'react'
import "./search.scss"
import AccountProfileService from "../../api/todo/AccountProfileService"
class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            search: "",
            display: false
        }
    }

    componentDidMount() {
        AccountProfileService.getAllUser().then(response => {
            this.setState({
                users: response.data
            });
        })
    }

    onFocus = () => {
        this.setState({ display: true });
    }
    
    onBlur = () => {
        this.setState({ display: false });
    }

    handleChange = (event) => {
        let content = event.target.value;
        this.setState({ search: content });
    }
    redirect(){
        window.location.href = "http://localhost:4200/profile/" + this.props.value;
    }

    render() {
        return (
            <div className="search-group">
                <input className="searchBar" onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.search} type="input" placeholder="Search.." onChange={this.handleChange}/>
                {this.state.display ? 
                <div className="resultBox">
                    {this.state.users.filter(user => this.state.search.length > 0 ? user.username.indexOf(this.state.search) > -1 : user).map(each => <div className="userSearch">{each.username}</div>)}
                </div> : null }
            </div>
        )
    }
}

export default SearchBarComponent;