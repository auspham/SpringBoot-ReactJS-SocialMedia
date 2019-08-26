import axios from 'axios'

class HelloWorldService {

    executeHelloWorldService() {
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldPathVariableService(name) {
        console.log(sessionStorage.getItem("USER_TOKEN"))
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);

    }

}

export default new HelloWorldService()