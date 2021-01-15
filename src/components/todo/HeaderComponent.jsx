import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';


class HeaderComponent extends Component {

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                    <div><a href="https://omreon.com/" className="navbar-brand">OMREON</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-link"><Link to={"/welcome/" + sessionStorage.getItem("authenticatedUserName")}>Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/todoList">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-link"><Link to="/">Login</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header >
        )
    }


}



export default withRouter(HeaderComponent);
