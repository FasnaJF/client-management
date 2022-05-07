import React, { useState, useEffect } from "react";
import ClientDataService from "../services/ClientService";
import { Link } from "react-router-dom";

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveClients();
    }, []);


    const retrieveClients = () => {
        ClientDataService.getAll()
            .then(response => {
                setClients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const setActiveClient = (client, index) => {
        setCurrentClient(client);
        setCurrentIndex(index);
    };

    const userData = JSON.parse(localStorage.getItem('user'));


    return (
        <div>
            {userData ?
                (<div className="list row">
                    <div className="col-md-6">
                        <h4>Clients List</h4>
                        <ul className="list-group">
                            {clients &&
                                clients.map((client, index) => (
                                    <li
                                        className={
                                            "list-group-item " + (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => setActiveClient(client, index)}
                                        key={index}
                                    >
                                        {client.first_name}
                                    </li>
                                ))}
                        </ul>

                    </div>
                    <div className="col-md-6">
                        {currentClient ? (
                            <div>
                                <h4>Client Details</h4>
                                <div>
                                    <label>
                                        <strong>Firstname:</strong>
                                    </label>{" "}
                                    {currentClient.first_name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Surname:</strong>
                                    </label>{" "}
                                    {currentClient.surname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Email:</strong>
                                    </label>{" "}
                                    {currentClient.email}
                                </div>
                                <div>
                                    <label>
                                        <strong>Profile Picture:</strong>
                                    </label>{" "}
                                    <img alt="profile_pic" src={"images/" + currentClient.profile_picture}
                                        className="img-fluid img-bordered" width="200px" height="200px"
                                    />
                                </div>
                                <Link
                                    to={`/clients/` + currentClient.id}
                                    className="badge badge-success"
                                >
                                    Edit Client Details
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Client to view more details</p>
                            </div>
                        )}
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
export default ClientList;