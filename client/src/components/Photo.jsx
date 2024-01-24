import { getLoggedInUser, getLoggedInUserToken } from "../auth";
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import '../styles/photo.css'
import { toast } from 'react-toastify';

function Photo() {
    const currentUser = getLoggedInUser();

    const token = getLoggedInUserToken();

    const [user, setUser] = useState([]);

    useEffect(() => {

        async function getUser() {
            if (!token) {
                return null;
            }

            try {
                const response = await axios.get(
                    `/users/${currentUser}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [currentUser, token]);

    async function setMainPhoto(photoId) {
        if (!token) {
            return null;
        }
        try {
            const response = await axios.put(
                `/users/set-main-photo/${photoId}`,
                null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
            );
            setUser(prevUser => ({
                ...prevUser,
                photos: prevUser.photos.map(photo => {
                    if (photo.id === photoId) {
                        return { ...photo, isMain: true };
                    } else {
                        return { ...photo, isMain: false };
                    }
                }),
            }));

            toast.success("Changed the main photo");

        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className="container photo d-flex justify-content-center align-content-center">
            {user.photos && user.photos.map((photo, index) => (
                <div className="card photo-card" key={index}>
                    <img src={photo.url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        {!photo.isMain && <button onClick={() => setMainPhoto(photo.id)} className="btn btn-success">Set Main Photo</button>}
                    </div>
                </div>
            ))}
        </div>
    );
}


export default Photo;