import React, { Component } from 'react'

class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    redirect(){
        console.log("redirect");
        window.location.href = "http://localhost:4200/profile/" + this.props.value;
    }

    handleSubmit(){
        
    }

    render() {
        return (
            <li><input type="search-bar" placeholder="Search.." onChange={this.props.handleChange}></input><button type="submit" onClick={this.props.handleClick} value={this.props.value}>Submit</button></li>
        )
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.value !== this.props.value) {
    //         this.setState({ value: nextProps.value });
    //     }
    // }
    

}

export default SearchBarComponent;