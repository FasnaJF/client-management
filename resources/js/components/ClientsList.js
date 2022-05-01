import axios from 'axios'
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Table, Button } from "reactstrap";
import CreateClient from './CreateClient'
import EditClient from './EditClient'
import "../../css/client.css";


export default class ClientsList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            newClientDetails: {
                first_name: "",
                surname: "",
                email: "",
                profile_picture: "",
            },
            status: "",
            newClientModal: false,
            editClientDetails: {
                id: "",
                first_name: "",
                surname: "",
                email: "",
                profile_picture: "",
            },
            editClientModal: false,
            noDataFound: "",
            firstNameErrorMessage: "",
            surnameErrorMessage: "",
            emailErrorMessage: "",
            imageErrorMessage: "",
            message: "",
            firstNameEditErrorMessage: "",
            surnameEditErrorMessage: "",
            emailEditErrorMessage: "",
            imageEditErrorMessage: ""

        };
    }

    componentDidMount() {
        this.getClients();
    }

    getClients() {
        this._isMounted = true;
        const login = localStorage.getItem('isLoggedIn');
        if (!login) {
            return <Navigate to="/login" />;
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        axios.get(`/api/client/` + userData.id, {
            headers: {
                'api_token': userData.api_token
            }
        }).then(response => {
            if (response.status === 200) {
                if (this._isMounted) {
                    this.setState({
                        clients: response.data ? response.data : []
                    });
                }
            }
            if (response.data.status === 500 && response.data.success === false) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    onLogoutHandler = () => {
        localStorage.clear();
        axios.post('/api/logout')
            .then(() => location.href = '/login')
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleNewClientModal = () => {
        this.setState({
            newClientModal: !this.state.newClientModal,
        });
    };

    onChangeAddClientHandler = (e) => {
        let { newClientDetails } = this.state;
        newClientDetails[e.target.name] = e.target.value;
        const userData = JSON.parse(localStorage.getItem('userData'));
        newClientDetails['admin_id'] = userData.id;
        if (e.target.name === 'profile_picture') {
            newClientDetails['profile_picture'] = e.target.files[0];
        }
        this.setState({ newClientDetails });
    };

    convertToFormData = (object) => {
        let formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    addClient = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        axios.post(`/api/createClient`, this.convertToFormData(this.state.newClientDetails), {
            headers: {
                'api_token': userData.api_token
            }
        }).then((response) => {

            if (response.data.status === 200) {
                const { clients } = this.state;
                const newClients = [...clients];
                newClients.push(response.data);
                this.setState(
                    {
                        clients: newClients,
                        newClientModal: false,
                        newClientDetails: {
                            first_name: "",
                            surname: "",
                            email: "",
                            profile_picture: "",
                        },
                    },
                    () => this.getClients()
                );
            } else if (response.data.status === 500) {
                this.setState({
                    firstNameErrorMessage: response.data.errors.first_name ? response.data.errors.first_name[0] : '',
                    surnameErrorMessage: response.data.errors.surname ? response.data.errors.surname[0] : '',
                    emailErrorMessage: response.data.errors.email ? response.data.errors.email[0] : '',
                    imageErrorMessage: response.data.errors.profile_picture ? response.data.errors.profile_picture[0] : '',
                    message: response.data.message
                });
                setTimeout(() => {
                    this.setState({
                        firstNameErrorMessage: "",
                        surnameErrorMessage: "",
                        emailErrorMessage: "",
                        imageErrorMessage: "",
                        message: " "
                    });
                }, 2500);
            }

        });
    };

    toggleEditClientModal = () => {
        this.setState({
            editClientModal: !this.state.editClientModal,
        });
    };

    onChangeEditClientHandler = (e) => {
        let { editClientDetails } = this.state;
        if (e.target.name === 'profile_picture') {
            editClientDetails['profile_picture'] = e.target.files[0];
        } else {
            editClientDetails[e.target.name] = e.target.value;
        }
        this.setState({ editClientDetails });
    };

    editClient = (id, first_name, surname, email, profile_picture) => {
        this.setState({
            editClientDetails: { id, first_name, surname, email, profile_picture },
            editClientModal: !this.state.editClientModal
        });
    };

    updateClient = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        let { id, first_name, surname, email, profile_picture } = this.state.editClientDetails;

        axios.post('/api/updateClient', this.convertToFormData({ id, first_name, surname, email, profile_picture }), {
            headers: {
                'api_token': userData.api_token
            }
        }).then((response) => {
            if (response.data.status === 200) {
                this.getClients();
                this.setState({
                    editClientModal: false,
                    editClientDetails: { first_name, surname, email, profile_picture },
                });
            } else if (response.data.status === 500) {

                this.setState({
                    firstNameEditErrorMessage: response.data.errors.first_name ? response.data.errors.first_name[0] : '',
                    surnameEditErrorMessage: response.data.errors.surname ? response.data.errors.surname[0] : '',
                    emailEditErrorMessage: response.data.errors.email ? response.data.errors.email[0] : '',
                    imageEditErrorMessage: response.data.errors.profile_picture ? response.data.errors.profile_picture[0] : '',
                    message: response.data.message
                });
                setTimeout(() => {
                    this.setState({
                        firstNameEditErrorMessage: "",
                        surnameEditErrorMessage: "",
                        emailEditErrorMessage: "",
                        imageEditErrorMessage: "",
                        message: " ",
                    });
                }, 2500);
            }
        })
            .catch((error) => {
                console.log(error.message);
            });
    };

    deleteClient = (id) => {

        const userData = JSON.parse(localStorage.getItem('userData'));
        axios.delete('/api/deleteClient/' + id, {
            headers: {
                'api_token': userData.api_token
            }
        }).then((response) => {
            this.setState({
                isLoading: false,
            });
            this.getClients();
        })
            .catch((error) => {

                console.log(error);

            });
    };

    render() {
        const login = localStorage.getItem('isLoggedIn');
        if (!login) {
            return <Navigate to="/login" />;
        }

        const { newClientDetails, noDataFound, clients } = this.state;
        let clientDetails = [];
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (clients.length > 0) {
            clientDetails = clients.map((client) => {
                return (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.first_name}</td>
                        <td>{client.surname}</td>
                        <td>{client.email}</td>
                        <td><img alt="profile_pic" src={"images/" + client.profile_picture}
                            className="img-fluid img-bordered" width="50px" height="50px"
                        /></td>
                        <td>
                            <Button color="success" size="sm" className="mr-3 edit-button"
                                onClick={() =>
                                    this.editClient(
                                        client.id,
                                        client.first_name,
                                        client.surname,
                                        client.email,
                                        client.profile_picture
                                    )
                                }>
                                Edit
                            </Button>
                            <Button color="danger" size="sm"
                                onClick={() => this.deleteClient(client.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }

        return (

            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <h4 className="font-weight-bold">Hi {userData.first_name}, welcome to your admin account</h4>
                    <Button className='float-right mb-4 log-out-button' onClick={this.onLogoutHandler}>Logout</Button>
                    <CreateClient
                        toggleNewClientModal={this.toggleNewClientModal}
                        newClientModal={this.state.newClientModal}
                        onChangeAddClientHandler={this.onChangeAddClientHandler}
                        addClient={this.addClient}
                        newClientDetails={newClientDetails}
                        message={this.state.message}
                        firstNameErrorMessage={this.state.firstNameErrorMessage}
                        surnameErrorMessage={this.state.surnameErrorMessage}
                        emailErrorMessage={this.state.emailErrorMessage}
                        imageErrorMessage={this.state.imageErrorMessage}

                    />
                    <EditClient
                        toggleEditClientModal={this.toggleEditClientModal}
                        editClientModal={this.state.editClientModal}
                        onChangeEditClientHandler={this.onChangeEditClientHandler}
                        editClient={this.editClient}
                        editClientDetails={this.state.editClientDetails}
                        updateClient={this.updateClient}
                        message={this.state.message}
                        firstNameEditErrorMessage={this.state.firstNameEditErrorMessage}
                        surnameEditErrorMessage={this.state.surnameEditErrorMessage}
                        emailEditErrorMessage={this.state.emailEditErrorMessage}
                        imageEditErrorMessage={this.state.imageEditErrorMessage}

                    />
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Profile Picture</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {clients.length === 0 ? (<tbody>
                            <tr>
                                <td>{noDataFound}</td>
                            </tr>
                        </tbody>) :
                            (<tbody>{clientDetails}</tbody>)}
                    </Table>
                </div>
            </div>
        )


    }
}
