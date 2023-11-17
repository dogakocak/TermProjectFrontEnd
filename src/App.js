import React, { useState } from 'react';
import logo from './logo.svg';
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Giriş başarılı olduğunda bu fonksiyonu çağırabilirsin.
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Çıkış yapıldığında bu fonksiyonu çağırabilirsin.
        setIsLoggedIn(false);
    };

    return (
        <Routes>
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
                <Route path='/*' element={<Homepage onLogout={handleLogout} />} />
            ) : (
                <Route path='/*' element={<Navigate to='/login' />} />
            )}
        </Routes>
    );
}

export default App;
