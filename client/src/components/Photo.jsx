import { getLoggedInUser, getLoggedInUserToken } from "../auth";
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import '../styles/photo.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

function Photo() {
    const currentUser = getLoggedInUser();

    const token = getLoggedInUserToken();

    const [user, setUser] = useState([]);

    const navigateTo = useNavigate();

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
            toast.error("Unable to change the main photo");
        }
    }


    async function deletePhoto(photoId) {
        if (!token) {
            return null;
        }
        try {
            const response = await axios.delete(
                `/users/delete-photo/${photoId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setUser(prevUser => ({
                ...prevUser,
                photos: prevUser.photos.filter(photo => photo.id !== photoId),
            }));

            toast.success("Photo Deleted");

        } catch (error) {
            toast.error("Unable to delete the photo");
        }
    }

    return (
        <div className="container">
            <div className="photo d-flex justify-content-center align-content-center">
                {user.photos && user.photos.map((photo, index) => (
                    <div className="card photo-card" key={index}>
                        <img src={photo.url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            {!photo.isMain && <button onClick={() => setMainPhoto(photo.id)} className="btn btn-outline-success mb-2">Set Main Photo</button>}
                            {!photo.isMain && <button onClick={() => deletePhoto(photo.id)} className="btn btn-outline-danger mb-2">Delete Photo</button>}
                        </div>
                    </div>
                ))}
                <Link to="add-photo">
                    <i className='bx bxs-image-add add-new-photo'></i>
                </Link>
            </div>
            <button onClick={() => navigateTo(-1)} className="btn btn-warning mt-2">Back</button>
        </div>
    );
}


export default Photo;