import axios from "axios";
import {API_URL} from "../../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME= "authenticatedUserName";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {

        return axios.get(`${API_URL}/basicAuth`,
            {
                headers: { authorization: this.createBasicAuthToken(username, password) }
            }
        )
    }

    executeJWTAuthenticationService(username, password) {

        return axios.post(`${API_URL}/authenticate`,
                 {username,password}
            
        )
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password);
    }

    registerSuccessfullLogin(username, password) {

        sessionStorage.setItem("authenticationStatus", true);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem("authenticatedDate", new Date());
        this.setupAxiosInterceptors(this.createBasicJWTToken(username, password));

    }

    createBasicJWTToken(username, token)
    {   console.log(token)
        return 'Bearer ' + token;
    }

    registerSuccessfullLoginForJWT(username, token) {
        sessionStorage.setItem("authenticationStatus", true);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem("token", token);
        this.setupAxiosInterceptors(this.createBasicJWTToken(username,token));

    }

    logout() {
        axios.interceptors.request.eject(sessionStorage.getItem("interceptorsId"))
        sessionStorage.removeItem("authenticationStatus");
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem("authenticatedDate");
        sessionStorage.removeItem("interceptorsId");
    }
    isUserLoggedIn() {
        if (sessionStorage.getItem("authenticationStatus") === null) return false;
        return true;
    }
    getAuthenticatedUser() {

        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

        setupAxiosInterceptors(token) {

            let currenctInterceptors = axios.interceptors.request.use((config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = token
                    return config;
                }
            })
            sessionStorage.setItem("interceptorsId", currenctInterceptors)

        }

}

export default new AuthenticationService();