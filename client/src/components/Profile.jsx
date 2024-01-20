import { useState, useEffect } from "react";
import axios from '../axiosConfig';
import { getLoggedInUserToken } from "../auth";
import '../styles/profile.css'
import { Link } from "react-router-dom";

function Profile(props) {

    const [user, setUser] = useState([])


    useEffect(() => {
        async function getProject() {

            const token = getLoggedInUserToken();

            if (!token) {
                return null;
            }

            try {
                const response = await axios.get(
                    `/users/${props.user}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }

                );
                setUser(response.data);
                console.log(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getProject();
    }, [props.user])


    return (
        <div className="container profile">
            <div className="card profile-card">
                <img src={user.photoUrl} className="card-img-top" />
                <div className="card-body profile-body">
                    <h5 className="card-title">{user.firstName} <span>{user.lastName}</span></h5>
                    <p className="card-text">{user.introduction}</p>
                    <p className="card-text">I am {user.age} years old</p>
                    <p className="card-text">I am from {user.city}, {user.country}</p>
                </div>
                <Link to="edit-profile">
                    <button className="btn btn-info">Edit Profile</button>
                </Link>
            </div>
        </div>
    )
}

export default Profile;