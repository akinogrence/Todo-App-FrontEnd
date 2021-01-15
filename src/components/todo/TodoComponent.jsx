import { Field, Formik, Form, ErrorMessage } from 'formik';
import moment from 'moment';
import React, { Component } from 'react'
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';


class TodoComponent extends Component {

    constructor(props) {
        super(props);


        this.state =

        {
            id: this.props.match.params.id,
            description: "Learn Forms with Formik",
            completedStatus: "true",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);


    }
    componentDidMount() {
        let username = AuthenticationService.getAuthenticatedUser();
        TodoDataService.retrieveTodoById(username, this.props.match.params.id).then
            (
                response => this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
                })
            );
    }
    onSubmit(todoFormValues) {
        let username = AuthenticationService.getAuthenticatedUser();

        let todo = {
            id: this.state.id,
            description: todoFormValues.description,
            targetDate: todoFormValues.targetDate,
        }
        if (this.state.id === -1) {

            TodoDataService.saveTodo(username, todo
            ).then(() => this.props.history.push(`/todoList`))

        }
        else {
            TodoDataService.updateTodoById(username, this.state.id, todo

            ).then(() => this.props.history.push(`/todoList`))
        }
    }
    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "Enter a Description";
        }
        else if (values.description.length < 5) {
            errors.description = "Enter at least 5 character";
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a Valid Date";
        }

        return errors;
    }


    render() {
        let { description, targetDate } = this.state;

        return (
            <div className="container">
                <h1>TO DO</h1>
                <Formik initialValues={{ description, targetDate }} onSubmit={this.onSubmit} validate={this.validate} validateOnBlur={false} validateOnChange={false} enableReinitialize={true}>
                    {(props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" />
                                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                            </fieldset>
                            <button type="submit" component="div" className="btn btn-success">Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }


}



export default TodoComponent;
