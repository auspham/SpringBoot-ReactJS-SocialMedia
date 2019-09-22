import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class AccountProfileService {

    retrieveInfo(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/profile`);
    }

    retrieveDetails(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/profile/details`);
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

    updateDetails(username, firstname, lastname, email, studentnumber, phonenumber, aboutme) {
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

    checkDuplicateUsername(username) {
        if (username != null) {
            return axios.get(`${JPA_API_URL}/checkuser/username/${username}`);
        }
    }

    checkDuplicateStudentnumber(studentnumber) {
        if (studentnumber != null) {
            return axios.get(`${JPA_API_URL}/checkuser/studentnumber/${studentnumber}`);
        }
    }

    checkDuplicateEmail(email) {
        if (email != null) {
            return axios.get(`${JPA_API_URL}/checkuser/email/${email}`);
        }
    }

    checkDuplicatePhonenumber(phonenumber) {
        if (phonenumber != null) {
            return axios.get(`${JPA_API_URL}/checkuser/phonenumber/${phonenumber}`);
        }
    }


    createInfo(name, profile) {
        return axios.post(`${JPA_API_URL}/users/${name}/profile/`, profile);
    }


    uploadAvatar(file, username) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${JPA_API_URL}/uploadAvatar/${username}`,formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            },
        });
    }

    
    uploadBackground(file, username) {
        const formData = new FormData();
        formData.set("file", file);
        return axios.post(`${JPA_API_URL}/uploadBackground/${username}`,formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            },
        });
    }


    getAvatarLink(username){
        return axios.get(`${JPA_API_URL}/users/${username}/profile/avatar`);
    }

    getBackgroundLink(username){
        return axios.get(`${JPA_API_URL}/users/${username}/profile/background`);
    }
    getAllUser() {
        return axios.get(`${JPA_API_URL}/users/`);
    }

}

export default new AccountProfileService()