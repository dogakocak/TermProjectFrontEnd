import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../Homepage/Homepage.css';
import './AddContact.css';
import Sidebar from '../Homepage/Sidebar';
import profile_photo from "../Assets/profile_photo_icon.svg";
import {useNavigate} from "react-router-dom";

const AddContact = ({ onLogout }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.set('isLoggedIn', false);
        onLogout();
    };

    const handleAddContact = async () => {
        const user_id = Cookies.get('user_id'); // Assuming you have stored user_id in cookies

        const requestData = {
            name,
            surname,
            phone_number: phoneNumber,
            user_id: parseInt(user_id, 10) || 0,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/add_contact', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Contact added successfully:', result);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Error adding contact:', errorData);
                // Handle error, e.g., show an error message
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className='homepage-container'>
            <Sidebar onLogout={handleLogout} />
            <div className='content'>
                <div className='cards'>
                    <div className='card'>
                        <img src={profile_photo} alt='Profile' />
                        <div className='card-content'>
                            <div className='inputs'>
                                <div className='input'>
                                    <input type='text' placeholder='Stock Code' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='add-c-container'>
                            <div className='add-c' onClick={handleAddContact}>Add</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
