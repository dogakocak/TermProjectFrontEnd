// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import search_icon from '../Assets/search_icon.svg';
import './Homepage.css';

const Sidebar = ({ onLogout }) => {
    const handleLogout = () => {
        onLogout();
    }

    return (
        <div className='sidebar'>
            <div className='input'>
                <input
                    type='text'
                    placeholder='Search a contact'
                />
                <img src={search_icon} alt='User Icon' className='icon' />
            </div>
            <div className='search-container'>
                <div className='button'>
                    Search
                </div>
            </div>
            <Link to="/add-contact" className='add-container button'>
                Add Stock
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
