import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class TodoDataService {

    retrieveAllTodos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }

    retrieveAll() {
        return axios.get(`${JPA_API_URL}/users/todos`);
    }

    retrieveTodo(name, id) {
        console.log('executed service Todo')
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

    retrieveTodoComments(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}/comments`);
    }

    postTodoComment(name, id, comment) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/${id}/comments`, comment);
    }

}

export default new TodoDataService()