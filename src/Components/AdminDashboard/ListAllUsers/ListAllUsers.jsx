import React, {useEffect, useState} from "react";
import AdminSidebar from "../AdminSidebar";
import UserList from './UserList'
import '../AdminDashboard.css'

const ListAllUsers = ({onLogout}) => {
    const handleLogout = () => {
        onLogout();
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const accessToken = sessionStorage.getItem('accessToken');
                if(accessToken){
                    const apiUrl = 'https://localhost:7250/api/Admin/GetAllUsers?role=User';
                    const response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'accept': 'text/plain',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if(response.ok){
                        const userData = await response.json();
                        setUsers(userData);
                    }
                    else{
                        throw new Error("Failed to fetch user data");
                    }
                }
            }
            catch (Error){
                console.error("Error fetching user data:",Error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className={"ListUsers"}>
            <AdminSidebar onLogout={handleLogout}/>
            <UserList users={users} />
        </div>
    );
}

export default ListAllUsers