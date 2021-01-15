import React, { Component } from 'react'
import WelcomeComponent from "./WelcomeComponent";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            username: 'OMREON',
            password: 'dummy',
            hasLoginFailed: null,

        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    handleOnChange(changeEventObj) {
        this.setState
            (
                {
                    [changeEventObj.target.name]: changeEventObj.target.value
                }
            )
    }

    loginClicked() {

        AuthenticationService
            .executeJWTAuthenticationService(this.state.username, this.state.password)
            .then(response => {
                if (response.data) {
                    this.setState
                        (
                            {
                                hasLoginFailed: false
                            }
                        )
                }
                AuthenticationService.registerSuccessfullLoginForJWT(this.state.username, response.data.token)
                return this.props.history.push('/welcome/' + this.state.username)
            }).catch(
                response => {
                    if (response) {
                        this.setState
                            (
                                {
                                    hasLoginFailed: true
                                }
                            )
                    }
                })
    }

    render() {
        return (
            <div className="container">
                {this.state.hasLoginFailed && <div className="alert alert-danger">INVALID LOGIN EVENT</div>}
                Username:<input type='text' name='username' value={this.state.username} onChange={this.handleOnChange}></input>
                Password:<input type='text' name='password' value={this.state.password} onChange={this.handleOnChange}></input>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
        )


    }
}








export default LoginComponent;
