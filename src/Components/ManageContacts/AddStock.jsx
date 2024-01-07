import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import './AddStock.css';
import Sidebar from '../Homepage/Sidebar';
import profile_photo from "../Assets/profile_photo_icon.svg";
import {useNavigate} from "react-router-dom";

const AddStock = ({ onLogout }) => {
    const [code, setCode] = useState('');
    const [extractedCodes, setExtractedCodes] = useState([]);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const handleAddStock = async () => {
        console.log("trigger");
        try {
            const accessToken = sessionStorage.getItem('accessToken');
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
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                showAlert(`${jsonResponse.error.message}`);
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`, 'error');
        }
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
            <Sidebar onLogout={onLogout} />
            <div className='content'>
                <div className='cards'>
                    <div id="alert-container"></div>
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
                        <div className='add-c-container' onClick={() => handleAddStock()}>
                            <div className='add-c'>Add</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddStock;
