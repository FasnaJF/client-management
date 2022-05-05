import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ClientDataService from "../services/ClientService";
const Client = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialClientState = {
        id: null,
        first_name: "",
        surname: "",
        email: "",
        profile_picture: "",
    };
    const [currentClient, setCurrentClient] = useState(initialClientState);
    const [message, setMessage] = useState("");
    const getClient = id => {
        ClientDataService.get(id)
            .then(response => {
                setCurrentClient(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
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
    const updatePublished = status => {
        var data = {
            id: currentClient.id,
            title: currentClient.title,
            description: currentClient.description,
            published: status
        };
        ClientDataService.update(currentClient.id, data)
            .then(response => {
                setCurrentClient({ ...currentClient, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const updateClient = () => {
        ClientDataService.update(currentClient.id, currentClient)
            .then(response => {
                console.log(response.data);
                setMessage("The client was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deleteClient = () => {
        ClientDataService.remove(currentClient.id)
            .then(response => {
                console.log(response.data);
                navigate("/clients");
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentClient ? (
                <div className="edit-form">
                    <h4>Client</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentClient.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentClient.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentClient.published ? "Published" : "Pending"}
                        </div>
                    </form>
                    {currentClient.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}
                    <button className="badge badge-danger mr-2" onClick={deleteClient}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateClient}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Client...</p>
                </div>
            )}
        </div>
    );
};
export default Client;