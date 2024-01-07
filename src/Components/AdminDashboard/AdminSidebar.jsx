import {Link} from "react-router-dom";
import React from "react";
import LoginIcon from "../Assets/LoginIcon.png";
import "./AdminDashboard.css"


const AdminSidebar = ({onLogout}) =>{
    const handleLogout = () => {
        onLogout();
    }
    return (
        <div className='AdminSidebar'>
            <div className='img'>
                <center><img src={LoginIcon}/></center>
            </div>
            <Link to="/" className='add-container button'>
                Homepage
            </Link>
            <Link to="/list-all-users" className='list-all-users button'>
                List All Users
            </Link>
            <div className='logout-container'>
                <div className='button' onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar

