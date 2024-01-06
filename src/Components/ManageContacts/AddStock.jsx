import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import '../Homepage/Homepage.css';
import './AddStock.css';
import Sidebar from '../Homepage/Sidebar';
import profile_photo from "../Assets/profile_photo_icon.svg";
import {useNavigate} from "react-router-dom";

const AddStock = ({ onLogout }) => {
    const [code, setCode] = useState('');
    const [extractedCodes, setExtractedCodes] = useState([]);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const handleLogout = () => {
        Cookies.set('isLoggedIn', false);
        onLogout();
    };

    const handleAddStock = async () => {
        console.log("trigger");
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            console.log(accessToken);
            if (!accessToken) {
                console.error('Access token not found in sessionStorage');
                return;
            }

            const apiUrl = `https://localhost:7250/api/Watchlist/AddStock?stockCode=${code}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                showAlert('Stock added successfully!', 'success');
            } else {
                console.error('Failed to add stock:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const showAlert = (message, type) => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.innerHTML = message;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 2000);
    };


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setCode(inputValue);

        if (inputValue.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filteredResults = extractedCodes.filter(item =>
            item.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSearchResults(filteredResults.slice(0, 6));


    };

    const fetchData = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (accessToken) {
                const apiUrl = 'https://localhost:7250/api/Stock/GetStocks';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'accept': 'text/plain',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const data = await response.text();
                const responseData = JSON.parse(data);

                const extractedCodes = responseData.map(item => item.code);
                setExtractedCodes(extractedCodes);

            } else {
                console.error('Access token not found in sessionStorage');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // İlk render'da çalışacak kısım
        fetchData();
    }, []);



    const handleResultClick = (result) => {
        setCode(result);
        setSearchResults([]);
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
                                    <input
                                        type='text'
                                        placeholder='Stock Code'
                                        value={code}
                                        onChange={handleInputChange}
                                    />
                                    <div className='search-results'>
                                        {searchResults.map((result, index) => (
                                            <div
                                                key={index}
                                                className='search-result-item'
                                                onClick={() => handleResultClick(result)}
                                            >
                                                {result}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='add-c-container'>
                            <div className='add-c' onClick={handleAddStock}>Add</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStock;
