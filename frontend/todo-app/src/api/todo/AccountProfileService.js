import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class AccountProfileService{

    retrieveInfo(name) {
        console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/profile`);
    }

    retrieveDetails(name) {
        console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/profile/details`);
    }

    retrieveAllInfo() {
        console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/all/profile`);
    }

    deleteInfo(name, id) {
        // console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/profile/${id}`);
    }

    updateInfo(name, id, profile) {
        // console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/profile/${id}`, profile);
    }

    updateDetails(username,firstname,lastname,email,studentnumber,phonenumber,aboutme) {
        return axios.post(`${API_URL}/updateProfile`, {
            username,
            firstname,
            lastname,
            email,
            studentnumber,
            phonenumber,
            aboutme
        })
    }

    createInfo(name, profile) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/profile/`, profile);
    }

}

export default new AccountProfileService()