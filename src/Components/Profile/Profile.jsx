import React from 'react';
import Sidebar from "../Homepage/Sidebar";
import Cookies from "js-cookie";

const Profile = ({ onLogout }) => {

    return (
        <div>
            <Sidebar onLogout={onLogout} />
        </div>
    );
};

export default Profile;