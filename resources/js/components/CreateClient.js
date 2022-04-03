import React, {Component} from "react";
import {Button, Modal,ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form} from "reactstrap";

export default class CreateClient extends Component{
    render() {
        return (
            <div>
                <Button className="float-right mb-4" color="primary" onClick={this.props.toggleNewClientModal}>
                    Add Client
                </Button>
                <Modal
                    isOpen={this.props.newClientModal}
                    toggle={this.props.toggleNewClientModal}
                >
                    <ModalHeader toggle={this.props.toggleNewClientModal}>Add New Client</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name"
                                   value={this.props.newClientDetails.first_name}
                                   onChange={this.props.onChangeAddClientHandler}
                                   required/>
                            <span className="text-danger">{this.props.firstNameErrorMessage}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="surname">Surname</Label>
                            <Input id="surname" name="surname"
                                   value={this.props.newClientDetails.surname}
                                   onChange={this.props.onChangeAddClientHandler}
                                   required/>
                            <span className="text-danger">{this.props.surnameErrorMessage}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" type="email"
                                   value={this.props.newClientDetails.email}
                                   onChange={this.props.onChangeAddClientHandler}
                                   required/>
                            <span className="text-danger">{this.props.emailErrorMessage}</span>
                        </FormGroup>
                        <FormGroup >
                            <Label for="profile_picture">Profile Picture</Label>
                            <Input type="file" id="profile_picture" name="profile_picture"
                                   onChange={this.props.onChangeAddClientHandler}
                                   required/>
                            <span className="text-danger">{this.props.imageErrorMessage}</span>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick ={() => this.props.addClient()}>Add</Button>
                        <Button color="secondary" onClick={this.props.toggleNewClientModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
