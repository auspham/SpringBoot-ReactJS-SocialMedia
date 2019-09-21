import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class AccountProfileService{

    retrieveInfo(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/profile`);
    }

    retrieveAllInfo() {
        return axios.get(`${JPA_API_URL}/users/all/profile`);
    }

    deleteInfo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/profile/${id}`);
    }

    updateInfo(name, id, profile) {
        return axios.put(`${JPA_API_URL}/users/${name}/profile/${id}`, profile);
    }

    createInfo(name, profile) {
        return axios.post(`${JPA_API_URL}/users/${name}/profile/`, profile);
    }

    getAllUser() {
        return axios.get(`${JPA_API_URL}/users/`);
    }

}

export default new AccountProfileService()