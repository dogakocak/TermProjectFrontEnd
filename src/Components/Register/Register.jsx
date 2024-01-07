import React, { useEffect, useState } from 'react';
import './Register.css';
import user_icon from '../Assets/user_icon.svg';
import password_icon from '../Assets/password_icon.svg';
import text_icon from '../Assets/text_icon.svg';
import login_icon from '../Assets/LoginIcon.png';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
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

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = async () => {
        if (!username || !password || !firstname || !lastname || !gender || !address) {
            // Eğer birisi boşsa, alert göster ve ilgili inputları kırmızı renge döndür
            showAlert('Please fill in all fields!', 'error');

            if (!username) {
                document.querySelector('.input input[placeholder="Username"]').style.border = '2px solid red';
            }
            if (!password) {
                document.querySelector('.input input[placeholder="Password"]').style.border = '2px solid red';
            }
            if (!firstname) {
                document.querySelector('.input input[placeholder="First Name"]').style.border = '2px solid red';
            }
            if (!lastname) {
                document.querySelector('.input input[placeholder="Last Name"]').style.border = '2px solid red';
            }
            if (!gender) {
                document.querySelector('.input input[type="radio"]').style.outline = '2px solid red'; // Radio button outline rengini değiştir
            }
            if (!address) {
                document.querySelector('.input.address input[placeholder="Address"]').style.border = '1px solid red';
            }

            return;
        }
        setLoading(true);

        const requestBody = {
            email: username,
            password: password,
            firstName: firstname,
            lastName: lastname,
            gender: gender,
            address: address,
        };

        try{
            const response = await fetch('https://localhost:7250/api/User/register', {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            const data = await response.json();

            if (data.error.status === 200){
                showAlert(data.error.message, 'success');
                setTimeout(function () {
                    navigate('/');
                }, 1500);
                return;
            }

            showAlert(data.error.message,'error');

        }catch (error){
            showAlert(error,'error');
        }finally {
            setLoading(false);
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
                <div className='text'>Registration</div>
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
                <div className='input'>
                    <input
                        type='text'
                        placeholder='First Name'
                        value={firstname}
                        onChange={handleFirstnameChange}
                        onKeyDown={handleEnterKeyPress}
                        name='loginPassword'
                        autoComplete='off'
                    />
                    <img src={text_icon} alt='Text Icon' className='icon' />
                </div>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Last Name'
                        value={lastname}
                        onChange={handleLastnameChange}
                        onKeyDown={handleEnterKeyPress}
                        name='loginPassword'
                        autoComplete='off'
                    />
                    <img src={text_icon} alt='Text Icon' className='icon' />
                </div>
                <div className='input'>
                    <input
                        type='radio'
                        value='E'
                        checked={gender === 'E'}
                        onChange={handleGenderChange}
                    />
                    <p style={{ color: gender === 'E' ? 'black' : '#949494' }}>Male</p>
                    <input
                        type='radio'
                        value='K'
                        checked={gender === 'K'}
                        onChange={handleGenderChange}
                    />
                    <p style={{ color: gender === 'K' ? 'black' : '#949494' }}>Female</p>
                </div>
                <div className='input address'>
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={handleAddressChange}
                        onKeyDown={handleEnterKeyPress}
                        name='loginPassword'
                        autoComplete='off'
                        style={{ height: '150px' }}
                    />
                    <img src={text_icon} alt='Text Icon' className='icon' />
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
                        'Register'
                    )}
                </div>
            </div>
            <div className='underline-footer'></div>
            <div className='footer-text'>Doğa Koçak & Umut Mete</div>
        </div>
    );
};

export default Register;
