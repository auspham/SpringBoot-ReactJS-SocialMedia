import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class TodoDataService {

    retrieveAllTodos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`, {
            headers: { authorization: sessionStorage.getItem('USER_TOKEN')}
        });
    }

    retrieveTodo(name, id) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`, {
            headers: { authorization: sessionStorage.getItem('USER_TOKEN')}
        });
    }

    deleteTodo(name, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`, {
            headers: { authorization: sessionStorage.getItem('USER_TOKEN')}
        });
    }

    updateTodo(name, id, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo, {
            headers: { authorization: sessionStorage.getItem('USER_TOKEN')}
        });
    }

    createTodo(name, todo) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo, {
            headers: { authorization: sessionStorage.getItem('USER_TOKEN')}
        });
    }

}

export default new TodoDataService()