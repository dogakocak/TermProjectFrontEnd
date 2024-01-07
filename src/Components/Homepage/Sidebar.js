import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

import LoginIcon from '../Assets/LoginIcon.png'
import async from "async";

const Sidebar = ({ onLogout }) => {

    useEffect(() => {
        console.log(sessionStorage.getItem('role'));
    }, []);

    const handleLogout = () => {
        onLogout();
    }

    return (
        <div className='sidebar'>
            <div className='img'>
                <center><img src={LoginIcon}/></center>
            </div>

            <Link to="/" className='add-container button'>
                Homepage
            </Link>
            <Link to="/add-contact" className='add-container button'>
                Add Stock
            </Link>
            <Link to="/profile" className='profilebtn button'>
                My Profile
            </Link>
            {sessionStorage.getItem('role') !== null && sessionStorage.getItem('role') !== 'false' && (
                <Link to="/admin-dashboard" className='admin-panel button'>
                    Admin Panel
                </Link>
            )}
            <div className='logout-container'>
                <div className='button' onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
