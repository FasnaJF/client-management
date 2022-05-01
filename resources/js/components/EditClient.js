import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, } from "reactstrap";

export default class EditClient extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editClientModal}
                    toggle={this.props.toggleEditClientModal}>
                    <ModalHeader toggle={this.props.toggleEditClientModal}>
                        Update Client
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name"
                                value={this.props.editClientDetails.first_name}
                                onChange={this.props.onChangeEditClientHandler} />
                            <span className="text-danger">{this.props.firstNameEditErrorMessage}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="surname">Surname</Label>
                            <Input id="surname" name="surname"
                                value={this.props.editClientDetails.surname}
                                onChange={this.props.onChangeEditClientHandler} />
                            <span className="text-danger">{this.props.surnameEditErrorMessage}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" type="email"
                                value={this.props.editClientDetails.email}
                                onChange={this.props.onChangeEditClientHandler} />
                            <span className="text-danger">{this.props.emailEditErrorMessage}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="profile_picture">Profile Picture</Label>
                            <Input type="file" id="profile_picture" name="profile_picture"
                                onChange={this.props.onChangeEditClientHandler} />
                            <span className="text-danger">{this.props.imageEditErrorMessage}</span>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.updateClient()}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditClientModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
