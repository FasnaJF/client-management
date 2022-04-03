import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            isLoading: false,
            emailErrorMessage: "",
            passwordErrorMessage: "",
            errorMessage: "",
        }
    }

    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
    };

    onSignInHandler = () => {
        this.setState({isLoading: true});
        axios.post(`/api/login`, {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                this.setState({isLoading: false});
                if (response.data.status === 200) {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('userData', JSON.stringify(response.data.data));
                    this.setState({
                        message: response.data.message,
                        redirect: true,
                    });
                }
                if (response.data.status === 500) {
                    this.setState({
                        emailErrorMessage: response.data.errors ? response.data.errors.email : "",
                        passwordErrorMessage: response.data.errors ? response.data.errors.password : "",
                        errorMessage: response.data.message,
                    });
                    setTimeout(() => {
                        this.setState({
                            emailErrorMessage: "",
                            passwordErrorMessage: "",
                            errorMessage: ""
                        });
                    }, 2500);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/dashboard"/>;
        }
        const login = localStorage.getItem('isLoggedIn');
        if (login) {
            return <Navigate to="/dashboard"/>;
        }
        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form className="containers sign-in">
                    <h3 className="title">Login</h3>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" placeholder="Email address" value={this.state.email}
                               onChange={this.onChangeHandler}/>
                        <span className="text-danger">{this.state.message}</span>
                        <span className="text-danger">{this.state.emailErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" placeholder="Password" value={this.state.password}
                               onChange={this.onChangeHandler}/>
                        <span className="text-danger">{this.state.passwordErrorMessage}</span>
                    </FormGroup>
                    <p className="text-danger">{this.state.errorMessage}</p>
                    <Button className="text-center mb-4" color="success" onClick={this.onSignInHandler}>
                        Sign In
                        {isLoading ? (<span className="spinner-border spinner-border-sm ml-5" role="status"
                                            aria-hidden="true"></span>)
                            : (<span></span>)}
                    </Button>
                    <p>No account yet? <Link to="/register" className="text-blue ml-5 mr-1">Create one here.</Link></p>
                </Form>
            </div>
        );
    }
}
