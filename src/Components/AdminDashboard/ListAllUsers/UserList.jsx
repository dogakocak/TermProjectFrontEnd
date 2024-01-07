import React from 'react'

const UserList = ({users}) => {
    const handleAppointAdmin = (email) => {};
    const handleChangePassword = (email) => {};
    const handleDeleteUser = (email) => {};

    return (
        <div className="user-list">
            {users.map((user, index) => (
                <div key={index} className="user">
                    <span>{user.email}</span>
                    <button onClick={() => handleAppointAdmin(user.email)}>
                        Appoint Admin
                    </button>
                    <button onClick={() => handleChangePassword(user.email)}>
                        Change Password
                    </button>
                    <button onClick={() => handleDeleteUser(user.email)}>
                        Delete User
                    </button>
                </div>
            ))}
        </div>
    )
}

export default UserList