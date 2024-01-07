import React, { useState, useEffect } from 'react';
import Sidebar from "../Homepage/Sidebar";
import './Profile.css';

const Profile = ({ onLogout }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://localhost:7250/api/User/GetInformation', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
                    },
                });
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        // Fonksiyonu çağır
        fetchUserProfile();
    }, []); // Boş bağımlılık dizisi, sadece bir kere çağrılmasını sağlar

    const handlePasswordChange = async () => {
        fetch('https://localhost:7250/api/User/ChangePassword', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                showAlert(data.error.message, data.error.status == 200 ? 'success' : 'error');
            })
            .catch(error => {
                console.error('API Request Error:', error);
            });

    };

    const showAlert = (message, type) => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.innerHTML = message;

        // Assuming you have a container element to hold your alerts
        const alertContainer = document.getElementById('alert-container');
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertContainer.removeChild(alertDiv);
        }, 2000);
    };

    if (!userProfile) {
        return <p>Loading...</p>;
    }

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
                        <div className="password-change-section">
                            <p>Şifre Değiştir</p>
                            <div>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    placeholder="Eski Şifre"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Yeni Şifre"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handlePasswordChange}>Şifre Değiştir</button>
                        </div>
                    </div>
                    <div id="alert-container"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
