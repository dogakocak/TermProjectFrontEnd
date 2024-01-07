import React from 'react'
import AdminSidebar from "./AdminSidebar";
import Cookies from "js-cookie";


const AdminDashboard = ({onLogout}) =>{
    const handleLogout = () => {
        Cookies.set('isLoggedIn', false);
        onLogout();
    };

    return (
        <div className={"AdminDashboard"}>
            <AdminSidebar onLogout={handleLogout}/>
        </div>
    );

}

export default AdminDashboard