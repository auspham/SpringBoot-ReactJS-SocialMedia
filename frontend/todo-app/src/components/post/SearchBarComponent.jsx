import React, { Component } from 'react'
import "./search.scss"
import AccountProfileService from "../../api/main/AccountProfileService"
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            display: false,
            mouseEnter:  false,
            filList: []
        }
    }

    componentWillMount() {
        this.getAllUser();
    }

    onConnected = () => {

    }

    getAllUser = () => {
        AccountProfileService.getAllUser().then(response => {
            this.setState({
                users: response.data,
                filList: response.data
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
        let filList = this.state.users;
        filList = filList.filter((item) => {
            return item.username.search(event.target.value) !== -1;
        })
        this.setState({ filList: filList });
    }

    onMouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    onMouseLeave = () => {
        this.setState({ mouseEnter: false });
    }

    render() {
        return <div className="search-group">
                <input className="searchBar" onFocus={this.onFocus} onBlur={this.onBlur} type="input" placeholder="Search.." onChange={this.handleChange}/>
                {this.state.display ? 
                <div className="resultBox" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    {this.state.filList.map((each, i) => <a href={"/profile/" + each.username} key={i}><div className="userSearch">{each.username}</div></a>)}
                </div> : null }
            </div>
    }
}

export default SearchBarComponent;