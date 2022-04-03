import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import "../../css/signup.css";
import {Navigate, Redirect} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registrationDetails: {
                first_name: "",
                surname: "",
                email: "",
                confirm_email: "",
                password: "",
                confirm_password: "",
                g_recaptcha_response: false,
            },
            message: "",
            firstNameErrorMessage: "",
            surnameErrorMessage: "",
            emailErrorMessage: "",
            confirmEmailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",

        };
    }

    onChangeHandler = (e, key) => {

        const {registrationDetails} = this.state;
        registrationDetails[e.target.name] = e.target.value;
        this.setState({registrationDetails});
    };

    onChangeRecaptcha = (value) => {
        this.setState({
            g_recaptcha_response: true
        })
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        axios.post(`/api/register`, this.state.registrationDetails)
            .then((response) => {
                this.setState({isLoading: false});
                if (response.data.status === 200) {
                    this.setState({
                        message: response.data.message,
                        registrationDetails: {
                            first_name: "",
                            surname: "",
                            email: "",
                            confirm_email: "",
                            password: "",
                            confirm_password: "",
                            g_recaptcha_response: false
                        },
                        redirect: true
                    });
                }
                if (response.data.status === 500) {
                    this.setState({
                        firstNameErrorMessage: response.data.errors.first_name,
                        surnameErrorMessage: response.data.errors.surname,
                        emailErrorMessage: response.data.errors.email,
                        confirmEmailErrorMessage: response.data.errors.confirm_email,
                        passwordErrorMessage: response.data.errors.password,
                        confirmPasswordErrorMessage: response.data.errors.confirm_password,
                        message: response.data.message
                    });
                    setTimeout(() => {
                        this.setState({
                            firstNameErrorMessage: "",
                            surnameErrorMessage: "",
                            emailErrorMessage: "",
                            confirmEmailErrorMessage: "",
                            passwordErrorMessage: "",
                            confirmPasswordErrorMessage: "",
                            message: " "
                        });
                    }, 2500);
                }
            });
    };

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
                <Form className="containers sign-up">
                    <h3 className="title">Create Your Account</h3>
                    <FormGroup>
                        <Label for="first_name">First Name</Label>
                        <Input type="name" name="first_name" placeholder="First Name"
                               value={this.state.registrationDetails.first_name} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.firstNameErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Surname</Label>
                        <Input type="name" name="surname" placeholder="Surname"
                               value={this.state.registrationDetails.surname} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.surnameErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" placeholder="Email"
                               value={this.state.registrationDetails.email} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.emailErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirm_email">Email</Label>
                        <Input type="email" name="confirm_email" placeholder="Confirm Email address"
                               value={this.state.registrationDetails.confirm_email} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.confirmEmailErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Email</Label>
                        <Input type="password" name="password" placeholder="Password"
                               value={this.state.registrationDetails.password} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.passwordErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirm_password">Email</Label>
                        <Input type="password" name="confirm_password" placeholder="Repeat your password"
                               value={this.state.registrationDetails.confirm_password} onChange={this.onChangeHandler}
                               required/>
                        <span className="text-danger">{this.state.confirmPasswordErrorMessage}</span>
                    </FormGroup>
                    <FormGroup>
                        <ReCAPTCHA sitekey={process.env.MIX_NOCAPTCHA_SITEKEY}
                                   onChange={this.onChangeRecaptcha}/>
                    </FormGroup>
                    <p className="text-danger">{this.state.message}</p>
                    <Button className="text-center mb-4" color="success" onClick={this.onSubmitHandler}
                            disabled={!this.state.g_recaptcha_response}>
                        Register
                        {isLoading ? (
                            <span className="spinner-border spinner-border-sm ml-5" role="status" aria-hidden="true"/>

                        ) : (
                            <span></span>
                        )}
                    </Button>
                </Form>
            </div>
        );
    }
}
