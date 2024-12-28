// src/components/Logout.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
