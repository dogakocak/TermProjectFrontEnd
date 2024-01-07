import React, { useState, useEffect } from 'react';
import './Homepage.css';

import Card from '../User/UserCard';
import Sidebar from './Sidebar';

const Homepage = ({ onLogout, bearerToken }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // API'den veri çekme işlemi
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7250/api/Watchlist/GetUserWatchlist', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();// API'den gelen verinin içindeki "contacts" dizisini kontrol et
                    setUserData(data); // API'den gelen "contacts" dizisini state'e set et
                    console.log(data);
                } else {
                    console.error('Error fetching data from the API');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData(); // fetchData fonksiyonunu çağır
    }, []); // useEffect sadece bir kere çalışsın diye boş bağımlılık dizisi kullanılır

    return (
        <div className='homepage-container'>
            <Sidebar onLogout={onLogout} />
            <div className='content'>
                {userData.map((user) => (
                    <Card key={user.id} userData={user} />
                ))}
            </div>
        </div>
    );
};

export default Homepage;
