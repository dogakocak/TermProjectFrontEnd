// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import search_icon from '../Assets/search_icon.svg';
import './Homepage.css';

import LoginIcon from '../Assets/LoginIcon.png'

const Sidebar = ({ onLogout }) => {
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
            <Link to="/admin-dashboard" className='admin-panel button'>
                Admin Panel
            </Link>
            <div className='logout-container'>
                <div className='button' onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
