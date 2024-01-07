import React from 'react';
import Sidebar from "../Homepage/Sidebar";
import './Profile.css';

const Profile = ({ onLogout }) => {

    return (
        <div className='profile-container'>
            <Sidebar onLogout={onLogout} />
            <div className='content'>
            </div>
        </div>
    );
};

export default Profile;