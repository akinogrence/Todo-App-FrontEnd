import React, { Component } from 'react'
import moment from "moment";
import TodoDataService from "../../components/api/todo/TodoDataService";
import AuthenticationService from "../../components/todo/AuthenticationService";


class TodoListComponent extends Component {


    constructor(props) {
        super(props);
        this.state =
        {
            toDoList: [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getAuthenticatedUser();
        TodoDataService.retrieveAllTodos(username).then(
            response => {
                if (response.data) {
                    console.log(response);
                    this.setState({ toDoList: response.data })
                }
            }
        );
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getAuthenticatedUser();
        console.log(id + "," + username)
        TodoDataService.deleteTodoById(username, id)
            .then(
                response => {
                    this.setState({ message: `Record[ ${id} ] was Deleted!` });
                    this.refreshTodos();
                }
            );

    }

    addTodoClicked() {
        this.props.history.push('/todo/' + "-1")
    }
    updateTodoClicked(id) {
        let username = AuthenticationService.getAuthenticatedUser();
        this.props.history.push('/todo/' + id)
        /*  TodoDataService.updateTodoById(username, id)
             .then(
                 response => {
                     this.setState({ message: `Record[ ${id} ] was Updated!` });
                     this.refreshTodos();
                 }
             ); */

    }

    render() {
        return (
            <div className="TodoListComponent">
                <h1>My Todo List</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>DESCRIPTION</th>
                                <th>STATUS</th>
                                <th>TARGET DATE</th>
                                <th>OPERATION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.toDoList.map
                                    (
                                        todo =>

                                            <tr key={todo.id}>
                                                <td>{todo.description}</td>
                                                <td>{todo.completedStatus.toString()}</td>
                                                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>DELETE</button>
                                                    <button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>UPDATE</button>
                                                </td>
                                            </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.addTodoClicked} className="btn btn-success" >(+)</button>
                </div>
            </div>
        )
    }


}



export default TodoListComponent;
