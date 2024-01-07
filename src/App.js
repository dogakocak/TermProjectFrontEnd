import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Homepage from './Components/Homepage/Homepage';
import AddStock from './Components/ManageContacts/AddStock';
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ListAllUsers from "./Components/AdminDashboard/ListAllUsers/ListAllUsers";

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
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
                <>
                    <Route path="/" element={<Homepage onLogout={handleLogout} />} />
                    <Route path="/add-contact" element={<AddStock onLogout={handleLogout} />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout}/>} />
                    <Route path="/list-all-users" element={<ListAllUsers onLogout={handleLogout}/>} />
                </>
            ) : (
                <Route path="/*" element={<Navigate to="/login" />} />
            )}
        </Routes>
    );
}

export default App;
