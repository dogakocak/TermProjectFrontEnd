import React, {useEffect, useState} from 'react';
import './Login.css';
import user_icon from '../Assets/user_icon.svg';
import password_icon from '../Assets/password_icon.svg';
import login_icon from '../Assets/LoginIcon.png';


import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";



const Login = ( {onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        if (Cookies.get('isLoggedIn') === 'true') {
            onLogin();
            navigate('/');
        }
    }, [onLogin]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        const apiUrl = 'https://localhost:7250/login';

        const requestBody = {
            email: username,
            password: password
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                Cookies.set('isLoggedIn', true);
                sessionStorage.setItem('accessToken', data["accessToken"]);
                navigate('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });


    };


    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Login to Stock App</div>
                <div className='underline'></div>
                <img src={login_icon} alt='Login Icon' />
            </div>
            {message && (
                <div className='alert'>
                    <span className='closebtn' onClick={() => setMessage('')}>&times;</span>
                    {message}
                </div>
            )}
            <div className='inputs'>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={handleUsernameChange}
                        onKeyDown={handleEnterKeyPress}
                        autoComplete='off'
                    />
                    <img src={user_icon} alt='User Icon' className='icon' />
                </div>
                <div className='input'>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={handleEnterKeyPress}
                        name='loginPassword'
                        autoComplete='off'
                    />
                    <img src={password_icon} alt='Password Icon' className='icon' />
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit' onClick={handleSubmit}>
                    Login
                </div>

            </div>

            <div className='underline-footer'></div>
            <div className='footer-text'>Doğa Koçak & Umut Mete</div>
        </div>
    );
};

export default Login;
