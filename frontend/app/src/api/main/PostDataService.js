import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class PostDataService {

    retrieveAllPosts(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }

    retrieveAll() {
        return axios.get(`${JPA_API_URL}/users/todos`);
    }

    retrievePost(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deletePost(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updatePost(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createPost(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

    retrievePostComments(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}/comments`);
    }

    postComment(name, id, comment) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/${id}/comments`, comment);
    }

}

export default new PostDataService()