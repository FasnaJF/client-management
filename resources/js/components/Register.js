import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from "../services/auth.service";
import ReCAPTCHA from "react-google-recaptcha";


const Register = () => {

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    confirm_email: Yup.string()
      .required('Confirm Email is required')
      .oneOf([Yup.ref('email'), null], 'Confirm Email does not match'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onChangeRecaptcha = () => {
    const disableSubmit = false;
    setDisableSubmit(disableSubmit);
  };

  const onSubmit = data => {

    setMessage("");
    setSuccessful(false);

    AuthService.register(data).then(
      (response) => {

        setMessage('User Registered Successfully');
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };


  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(onSubmit)} >
          {!successful && (
            <div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="first_name"
                  type="text"
                  {...register('first_name')}
                  className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.first_name?.message}</div>
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  name="surname"
                  type="text"
                  {...register('surname')}
                  className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.surname?.message}</div>
              </div>
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
                <label>Confirm Email</label>
                <input
                  name="confirm_email"
                  type="email"
                  {...register('confirm_email')}
                  className={`form-control ${errors.confirm_email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.confirm_email?.message}</div>
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
                <label>Confirm Password</label>
                <input
                  name="confirm_password"
                  type="password"
                  {...register('confirm_password')}
                  className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.confirm_password?.message}</div>
              </div>
              <div className="form-group">
                <ReCAPTCHA sitekey={process.env.MIX_NOCAPTCHA_SITEKEY}
                  onChange={onChangeRecaptcha} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={disableSubmit}>Sign Up</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Register;