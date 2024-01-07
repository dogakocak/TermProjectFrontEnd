import React, { useEffect, useState } from 'react';
import './Login.css';
import user_icon from '../Assets/user_icon.svg';
import password_icon from '../Assets/password_icon.svg';
import login_icon from '../Assets/LoginIcon.png';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true); // İstek başladığında loading durumunu true yap
        const apiUrl = 'https://localhost:7250/login';

        const requestBody = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.status === 401) {
                showAlert('Kullanıcı adı veya şifre yanlış', 'error');
            } else {
                Cookies.set('isLoggedIn', true);
                sessionStorage.setItem('accessToken', data['accessToken']);
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // İstek tamamlandığında loading durumunu false yap
        }
    };

    const showAlert = (message, type) => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.innerHTML = message;

        const alertContainer = document.getElementById('alert-container');
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertContainer.removeChild(alertDiv);
        }, 2000);
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
            <div id='alert-container'></div>
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
                    {loading ? (
                        <BeatLoader
                            color='#fff'
                            loading={true}
                            css={css`
                display: inline-block;
                margin-top: -4px; // İhtiyaca göre ayarlayabilirsiniz
              `}
                        />
                    ) : (
                        'Login'
                    )}
                </div>
            </div>
            <div className='register-link'>
                <p>
                    Dont have an account? <Link to='/register'>Register</Link>
                </p>
            </div>
            <div className='underline-footer'></div>
            <div className='footer-text'>Doğa Koçak & Umut Mete</div>
        </div>
    );
};

export default Login;
