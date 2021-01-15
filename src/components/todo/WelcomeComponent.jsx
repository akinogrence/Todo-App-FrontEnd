import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../api/todo/HelloWorldService';


class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state =
        {
            messageFromService: 'WithoutService',
            isMessageError: false
        }
        this.showCustomWelcomeMessage = this.showCustomWelcomeMessage.bind(this)
        this.handleError = this.handleError.bind(this);

    }

    showCustomWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathVariableService(sessionStorage.getItem("authenticatedUserName"))
            .then(response => this.handleSuccessfullResponse(response))
            .catch(error => this.handleError(error))
    }
    handleSuccessfullResponse(response) {

        this.setState(
            {
                "messageFromService": response.data.helloWorldString,
                isMessageError: false
            }

        )
    }
    handleError(error) {
        console.log(error)
        let errorMessage = "";
        if (error.message) {
            errorMessage += error.message
        }

        if (error.response && error.response.data) {
            errorMessage+=error.response.data.message;
        }
        this.setState
            ({
                messageFromService: errorMessage,
                isMessageError: true
            })
    }



    render() {
        return (
            <>
                <h1>WELCOME {sessionStorage.getItem("authenticatedUserName")}</h1>
                {this.state.isMessageError && <div className="alert alert-danger">{this.state.messageFromService}</div>}
                <div className="container">İf You want manage your ToDoList click
                <Link to="/todoList">Todos</Link>
                    <div>
                        <button className="btn btn-success" type="button" onClick={this.showCustomWelcomeMessage}>Show Message Come From Service</button>
                    </div>
                    {!this.state.isMessageError && <div>{this.state.messageFromService}</div>}
                </div>
            </>
        )
    }


}



export default WelcomeComponent;
