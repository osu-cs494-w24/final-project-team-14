import React from 'react';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function UserBox() {

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-box">
            
            <span className="login-emoji" onClick={handleToggle}>🔒</span>
                <div className="user-box-content">
                    <a href="#">Login</a>
                    <NavLink to="/signup">Create Account</NavLink>
                </div>
        </div>
    );
}