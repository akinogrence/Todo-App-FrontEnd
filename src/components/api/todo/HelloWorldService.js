import axios from "axios";


class HelloWorldService {

    executeHelloWorldService() {


        return axios.get("http://localhost:8080/helloWorld");
    }

    executeHelloWorldBeanService() {

        return axios.get("http://localhost:8080/helloWorldBean");
    }

    executeHelloWorldPathVariableService(username) {

        return axios.get(`http://localhost:8080/helloWorld/${username}`,
        );
    }

   


}
export default new HelloWorldService();