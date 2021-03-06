import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ClientDataService from "../services/ClientService";

const Client = props => {
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        surname: Yup.string().required('Surname is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        profile_picture: Yup.mixed()
            .test("fileSize", "The file is too large", (value) => {
                return (typeof (value[0]) == 'object') ? (value && value[0] && value[0].size <= 20000000) : true;
            })
            .test("type", "Only the following formats are accepted: .jpeg, .jpg, .gif, .svg and.png", function (value) {
                return (typeof (value[0]) == 'object') ? value && value[0] && (
                    value[0].type === "image/jpeg" ||
                    value[0].type === "image/jpg" ||
                    value[0].type === "image/png" ||
                    value[0].type === "image/gif" ||
                    value[0].type === "image/svg"
                ) : true;
            }),
    });

    const { id } = useParams();
    const initialClientState = {
        id: null,
        first_name: "",
        surname: "",
        email: "",
        profile_picture: "",
        admin_id: ""
    };
    const [currentClient, setCurrentClient] = useState(initialClientState);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const getClient = id => {
        ClientDataService.get(id)
            .then(response => {
                const client = response.data;
                setCurrentClient(response.data);
                const fields = ['first_name', 'surname', 'email', 'profile_picture'];
                fields.forEach(field => setValue(field, client[field]));
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.errors) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };

    useEffect(() => {
        if (id)
            getClient(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentClient({ ...currentClient, [name]: value });
    };

    const onSubmit = () => {
        ClientDataService.update(currentClient.id, currentClient)
            .then(response => {
                setMessage("The client was updated successfully!");
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.errors) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };

    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            {currentClient && userData ? (
                <div className="edit-form">
                    <h4>Edit Client Details</h4>
                    <div className="col-md-12">
                        <div className="card card-container">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        {...register('first_name')}
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        className={`form-control ${errors.profile_picture ? 'is-invalid' : ''}`}
                                    />
                                    <div className="invalid-feedback">{errors.profile_picture?.message}</div>
                                </div>
                                <button
                                    className="btn btn-warning col-md-12 mb-2"
                                >
                                    Update Client Details
                                </button>
                            </form>
                            <Link className="btn btn-primary" to='/dashboard'>
                                Cancel
                            </Link>
                            <div>
                            </div>
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-dark" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </div>
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
export default Client;