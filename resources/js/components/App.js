import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import Login from "../components/Login";
import Register from "../components/Register";
import Client from "../components/Client";
import ClientList from "../components/ClientList";
import AddClient from "../components/AddClient";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a href="/dashboard" className="navbar-brand">
          Client Management
        </a>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add New Client
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login user={currentUser} />} />
          <Route path="/register" element={<Register user={currentUser} />} />
          <Route path="/dashboard" element={<ClientList />} />
          <Route path="/" element={<ClientList />} />
          <Route path="/add" element={<AddClient />} />
          <Route path="/clients/:id" element={<Client />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;