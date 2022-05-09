import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ClientDataService from "../services/ClientService";

const AddClient = () => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    profile_picture: Yup.mixed()
      .test('required', "You need to provide a image file", (value) => {
        return value && value.length
      })
      .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 20000000;
      })
      .test("type", "Only the following formats are accepted: .jpeg, .jpg, .gif, .svg and.png", function (value) {
        return value && value[0] && (
          value[0].type === "image/jpeg" ||
          value[0].type === "image/jpg" ||
          value[0].type === "image/png" ||
          value[0].type === "image/gif" ||
          value[0].type === "image/svg"
        );;
      }),
  });

  const initialClientState = {
    id: null,
    first_name: "",
    surname: "",
    email: "",
    profile_picture: "",
    admin_id: ""
  };
  const [client, setClient] = useState(initialClientState);
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const convertToFormData = (object) => {
    let formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  const onSubmit = data => {
    setMessage("");
    const userData = JSON.parse(localStorage.getItem('user'));
    data['admin_id'] = userData.id;
    data['profile_picture'] = data.profile_picture[0];

    ClientDataService.create(convertToFormData(data))
      .then((response) => {
        setClient({
          id: response.data.id,
          first_name: response.data.first_name,
          surname: response.data.surname,
          email: response.data.email,
          profile_picture: response.data.profile_picture,

        });
        setSubmitted(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.errors) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      })
  };

  const newClient = () => {
    setClient(initialClientState);
    setSubmitted(false);
  };

  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {userData ? (
        <div className="col-md-12">
          <div className="card card-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              {submitted ? (
                <div className="text-center">
                  <h4>You have created a client entry successfully!</h4>
                  <Link className="btn btn-info" to='/dashboard'>
                    Go back to dashboard
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      {...register('first_name')}
                      className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.first_name?.message}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      {...register('surname')}
                      className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.surname?.message}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="profile_picture">Profile Picture</label>
                    <input
                      type="file"
                      id="profile_picture"
                      name="profile_picture"
                      {...register('profile_picture')}
                      className={`form-control ${errors.profile_picture ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.profile_picture?.message}</div>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">
                      Submit
                    </button>
                  </div>
                </div>
              )}
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
      ) : (
        <div>
          <br />
          <p>Please login to proceed..</p>
        </div>
      )}
    </div>
  );
};
export default AddClient;