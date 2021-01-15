import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WelcomeComponent from './components/todo/WelcomeComponent'
import LoginComponent from './components/todo/LoginComponent'
import TodoListComponent from './components/todo/TodoListComponent'
import ErrorComponent from './components/todo/ErrorComponent'
import HeaderComponent from './components/todo/HeaderComponent'
import FooterComponent from './components/todo/FooterComponent'
import LogoutComponent from './components/todo/LogoutComponent'
import AuthenticatedRouter from "./components/todo/AuthenticatedRouter";
import TodoComponent from './components/todo/TodoComponent';

import './App.css';
import './bootstrap.css';

/* import FirstComponent from './components/learning-examples/FirstComponent'
import SecondComponent from './components/learning-examples/SecondComponent'
import Counter from './components/counter/Counter'
import ThirdComponent, { ThirdComponentFromFunction } from './components/learning-examples/ThirdComponent' */


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <HeaderComponent></HeaderComponent>
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <AuthenticatedRouter path="/todoList" component={TodoListComponent} />
            <AuthenticatedRouter path="/welcome/:name" component={WelcomeComponent} />
            <Route path="/logout" component={LogoutComponent} />
            <AuthenticatedRouter path="/todo/:id" component={TodoComponent} />
            <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent></FooterComponent>
        </Router>
      </div>
    );
  }
}

/* class LearningComponent extends Component {
  render() {
    return (
      <div className="App">
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
        <ThirdComponentFromFunction></ThirdComponentFromFunction>
      </div>
    );
  }
}

class CounterComponent extends Component {
  render() {
    return (
      <div className="App">
        <Counter></Counter>
      </div>
    );
  }
}

 */


export default App;
