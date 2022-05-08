import React, { useState, useEffect, useMemo, useRef } from "react";
import ClientDataService from "../services/ClientService";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import AddClient from "./AddClient";
import { string } from "prop-types";

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [message, setMessage] = useState("");
    const clientsRef = useRef();
    clientsRef.current = clients;
    let navigate = useNavigate();

    const columns = useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "first_name",
            },
            {
                Header: "Surname",
                accessor: "surname",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Profile Picture",
                accessor: "profile_picture",
                Cell: tableProps => (
                    <img
                        src={`images/` + tableProps.row.original.profile_picture}
                        width={60}
                        alt='Client'
                    />
                )
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openClient(rowIdx)}>
                                <button className="btn btn-warning mr-2">Edit</button>
                            </span>
                            <span onClick={() => deleteClient(rowIdx)}>
                                <button className="btn btn-danger">Delete</button>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    let clientsData = !(clients === null || clients.length === 0 || typeof (clients) === 'string') ? clients : [];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: clientsData,
    });

    useEffect(() => {
        retrieveClients();
    }, []);

    const openClient = (rowIndex) => {
        const id = clientsRef.current[rowIndex].id;
        navigate("/clients/" + id);
    };
    const deleteClient = (rowIndex) => {
        const id = clientsRef.current[rowIndex].id;
        ClientDataService.remove(id)
            .then((response) => {
                navigate("/");
                let newClients = [...clientsRef.current];
                newClients.splice(rowIndex, 1);
                setClients(newClients);
            })
            .catch((e) => {
                setMessage('There is an issue while deleting this client!');
            });
    };

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then(response => {
                setClients(response.data);
            })
            .catch(e => {
                setMessage('There is an issue while fetching clients for this user!');
            });
    };


    const userData = JSON.parse(localStorage.getItem('user'));


    return (
        <div>
            {userData ? (
                <div>
                    <h4>Hi {userData.first_name}, welcome to your admin account</h4>
                    {clientsData.length ?
                        (<div className="list row">
                            <div className="col-md-12 list">
                                <table
                                    className="table table-striped table-bordered"
                                    {...getTableProps()}
                                >
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column) => (
                                                    <th {...column.getHeaderProps()}>
                                                        {column.render("Header")}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => {
                                                        return (
                                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        ) : (
                            <div className="list row">
                                <div className="col-md-12 list">
                                    You don't have any clients data yet..
                                    <span onClick={() => navigate('/add')}>
                                        <button className="btn btn-warning">Add Client</button>
                                    </span>
                                </div>
                            </div>
                        )}
                    <p>{message}</p>
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