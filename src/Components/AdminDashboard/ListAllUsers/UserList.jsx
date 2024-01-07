import React, {useState} from 'react'
import './UserList.css'

const UserList = ({users}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePasswordEmail, setChangePasswordEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
        }, 200000);
    };
    const handleAppointAdmin = async (email) => {
        try{
            const accessToken = sessionStorage.getItem('accessToken');
            if(accessToken){
                const apiUrl = 'https://localhost:7250/api/Admin/AppointAdmin';
                const response = await fetch(apiUrl,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body:JSON.stringify({
                        email:email
                    })
                });
                if(response.ok){
                    showAlert(`Successfully appointed admin for ${email}`,'success');
                }
                else {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    showAlert(`${jsonResponse}`,'error');
                }
            }
        }
        catch (error){
            showAlert(`Error: ${error.message}`, 'error');
        }
    };
    const handleChangePassword = async (event) => {
        try{
            const accessToken = sessionStorage.getItem('accessToken');
            if(accessToken){
                const apiUrl = 'https://localhost:7250/api/Admin/ChangePassword';
                const response = await fetch(apiUrl,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body:JSON.stringify({
                        email:changePasswordEmail,
                        newPassword:newPassword
                    })
                });
                if(response.ok){
                    showAlert(`Successfully changed password for ${changePasswordEmail}`,'success');
                }
                else {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    showAlert(`${jsonResponse}`,'error');
                }
            }
        }
        catch (error){
            showAlert(`Error: ${error.message}`, 'error');
        }
    };
    const handleDeleteUser = async (email) => {
        try{
            const accessToken = sessionStorage.getItem('accessToken');
            if(accessToken){
                const apiUrl = 'https://localhost:7250/api/Admin/DeleteUser';
                const response = await fetch(apiUrl,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body:JSON.stringify({
                        email:email
                    })
                });
                if(response.ok){
                    showAlert(`Successfully deleted user ${email}`,'success');
                }
                else {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    showAlert(`${jsonResponse}`,'error');
                }
            }
        }
        catch (error){
            showAlert(`Error: ${error.message}`, 'error');
        }
    };

    return (
        <div className="user-list">
            <div id="alert-container"></div>
            {users.map((user, index) => (
                <div key={index} className="user">
                    <span>{user.email}</span>
                    <button onClick={() => handleAppointAdmin(user.email)}>
                        Appoint Admin
                    </button>
                    <button onClick={() => handleDeleteUser(user.email)}>
                        Delete User
                    </button>
                </div>
            ))}
            <div className="admin-change-password">
                <h1 className="header1">Change Password</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        value={changePasswordEmail}
                        onChange={(e) => setChangePasswordEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
            </div>
        </div>
    )
}

export default UserList