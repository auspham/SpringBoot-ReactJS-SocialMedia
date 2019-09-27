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
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
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