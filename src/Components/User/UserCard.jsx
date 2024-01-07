import React, {useState} from "react";
import './UserCard.css';
import profile_photo from '../Assets/profile_photo_icon.svg';
import remove from '../Assets/remove_icon.svg';
import edit from '../Assets/edit_icon.svg';
import Cookies from "js-cookie";

function Card({ userData }) {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        fetch(`https://localhost:7250/api/Watchlist/DeleteStock?stockCode=${userData.code}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
        })
            .then(response => {
                if (response.ok) {
                    // Silme işlemi başarılı ise durumu güncelle
                    setIsDeleted(true);
                }
            })
            .catch(error => {
                console.error('Silme işlemi başarısız:', error);
            });
    }

    if (isDeleted) {
        // Eğer silme işlemi gerçekleştiyse, boş bir div göster
        return <div className='cards'></div>;
    }

    return (
        <div className='cards'>
            <div className='card'>
                <img src={profile_photo} alt='Profile' />
                <div className='card-content'>
                    <h2>{userData.code}</h2>
                    <p>{userData.name}</p>
                    <p>{userData.price} ₺</p>
                </div>
                <div className='delete-container'>
                    <div className='delete' onClick={handleDelete}>Delete</div>
                </div>
            </div>
        </div>
    );
}

export default Card;