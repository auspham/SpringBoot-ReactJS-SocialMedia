import React, { Component } from 'react'

class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    redirect(){
        window.location.href = "http://localhost:4200/profile/" + this.props.value;
    }

    render() {
        return (
            <li><input type="search-bar" placeholder="Search.." onChange={this.props.handleChange}></input><button type="submit" onClick={this.props.handleClick} value={this.props.value}>Submit</button></li>
        )
    }
}

export default SearchBarComponent;