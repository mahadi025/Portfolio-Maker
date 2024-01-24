import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../auth";
import { toast } from 'react-toastify';
function Register() {

    const [createUser, setCreateUser] = useState({});

    const navigateTo = useNavigate();

    const user = getLoggedInUser();

    useEffect(() => {
        if (user) {
            navigateTo("/");
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/account/register/`, createUser);
            navigateTo('/login');
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
                const validationErrors = error.response.data.errors;

                for (const key in validationErrors) {
                    const errorMessages = validationErrors[key];
                    errorMessages.forEach(errorMessage => {
                        toast.error(`${key}: ${errorMessage}`);
                        console.error(`${key}: ${errorMessage}`);
                    });
                }
            } else if (error.response && error.response.data && error.response.data.length > 0) {
                const firstError = error.response.data[0];
                toast.error(firstError.description);
                console.error(firstError.description);
            } else {
                toast.error('An error occurred during registration.');
            }
        }
    };




    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div>
                <form className="create-project-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        value={createUser.firstName || ''}
                        type="text"
                        name="firstName"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        value={createUser.lastName || ''}
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        value={createUser.password || ''}
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="username">Username</label>
                    <input
                        value={createUser.username || ''}
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="city">City</label>
                    <input
                        value={createUser.city || ''}
                        type="text"
                        name="city"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="country">Country</label>
                    <input
                        value={createUser.country || ''}
                        type="text"
                        name="country"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="gender">Gender</label>
                    <input
                        value={createUser.gender || ''}
                        type="text"
                        name="gender"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        value={createUser.dateOfBirth || ''}
                        type="date"
                        name="dateOfBirth"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
                <button onClick={() => { navigateTo(-1); }} className="btn btn-warning mt-3">Back</button>
            </div>
        </div>
    )
}

export default Register;