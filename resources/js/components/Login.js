import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthService from "../services/auth.service";


const Login = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
    });


    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {

        setMessage("");
        setLoading(true);

        AuthService.login(data).then(
            (response) => {

                if(response.id){
                    navigate("/dashboard");
                    window.location.reload();
                }
              
                const resMessage =
                    (response &&
                       response.data &&
                        response.data.message) ||
                        response.message ||
                        response.toString();
                setLoading(false);
                setMessage(resMessage);
            },
            (error) => {
                console.log(error);
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    };
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
export default Login;