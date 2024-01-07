import React from 'react';
import Sidebar from "../Homepage/Sidebar";
import './Profile.css';

const Profile = ({ onLogout }) => {
    const userProfile = {
        "firstName": "Doğa",
        "lastName": "Koçak",
        "email": "doga@kocak.com",
        "address": "eryaman 3. etap",
        "gender": "E",
        "emailConfirmed": false
    };

    return (
        <div className='profile-container'>
            <Sidebar onLogout={onLogout} />
            <div className='content'>
                <div className='profile'>
                    <h2>Profile Information</h2>
                    <div className='profile-details'>
                        <div>
                            <strong>First Name:</strong> {userProfile.firstName}
                        </div>
                        <div>
                            <strong>Last Name:</strong> {userProfile.lastName}
                        </div>
                        <div>
                            <strong>Email:</strong> {userProfile.email}
                        </div>
                        <div>
                            <strong>Address:</strong> {userProfile.address}
                        </div>
                        <div>
                            <strong>Gender:</strong> {userProfile.gender}
                        </div>
                        <div>
                            <strong>Email Confirmed:</strong> {userProfile.emailConfirmed ? 'Yes' : 'No'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
