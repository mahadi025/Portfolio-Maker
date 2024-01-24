import { useState, useEffect } from "react";
import axios from "../axiosConfig"
import { getLoggedInUser, getLoggedInUserToken } from "../auth";
import { useNavigate } from 'react-router-dom';

function EditProfile() {

    const [editUser, setEditUser] = useState({});

    const user = getLoggedInUser();

    const token = getLoggedInUserToken();

    const navigateTo = useNavigate();

    useEffect(() => {
        async function getUser() {

            if (!token) return null;

            try {
                const response = await axios.get(`/users/${user}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) throw new Error('Network response was not ok');

                setEditUser(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            navigateTo(-1);
            return;
        }

        try {
            const payload = {
                ...editUser,
            };

            const response = await axios.put(
                `/users`,
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log('Server response:', response.data);
            navigateTo(-1);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div>
                <form className="edit-project-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        value={editUser.firstName || ''}
                        type="text"
                        name="firstName"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        value={editUser.lastName || ''}
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="introduction">Introduction</label>
                    <input
                        value={editUser.introduction || ''}
                        type="text"
                        name="introduction"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
                <button onClick={() => { navigateTo(-1); }} className="btn btn-warning mt-3">Back</button>
            </div>
        </div>
    );
}

export default EditProfile;