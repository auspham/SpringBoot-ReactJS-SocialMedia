import React, { Component } from 'react'
import { ReactComponent as Close } from './assets/times.svg';
import { ReactComponent as Edit } from './assets/edit.svg';
import Editable from './Editable'
import moment from 'moment'

export default class TodoCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    toggleShow = (event) => {
        this.setShow(!this.state.show);
    }
    
    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    render() {
        return (   
        <div className="ui-block ui-custom" key={this.props.todo.id}>
            <div className="status-head">
                <div className="status-left">
                    {this.props.username}
                    <div className="date">{moment(this.props.todo.targetDate).format('YYYY-MM-DD')}</div>
                </div>
                <div className="status-right">
                    {/* <button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button> */}
                    {/* <button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}><Close/></button> */}
                    <Edit onClick={this.toggleShow}/>
                    <Close onClick={() => this.props.deleteTodoClicked(this.props.todo.id)}/>
                </div>
            </div>
            <div className="status-content">
                {!this.state.show && this.props.todo.description}
                {this.state.show && <Editable todo={this.props.todo} toggleShow={this.toggleShow} username={this.props.username} refreshTodos={this.props.refreshTodos} content={this.props.todo.description}></Editable>}
            </div>
        </div>);
    }
}