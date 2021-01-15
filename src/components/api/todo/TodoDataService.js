import axios from "axios";

class TodoDataService {

    
    retrieveAllTodos(username) {

        return axios.get(`http://localhost:8080/users/${username}/todos`);
    }

    retrieveTodoById(username,id) {

        return axios.get(`http://localhost:8080/users/${username}/todos/${id}`);
    }

    deleteTodoById(username,id) {

        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
    }
    
    updateTodoById(username,id,todo) {

        return axios.put(`http://localhost:8080/users/${username}/todos/${id}`,todo);
    }
    
    saveTodo(username,todo) {

        return axios.post(`http://localhost:8080/users/${username}/todos/`,todo);
    }


}
export default new TodoDataService();